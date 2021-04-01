import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelectedNotes } from '../../context/SelectedNotesCtx';
import { NotesList } from '../../patterns';
import { listSelector } from '../../store/slices/listSlice';
import * as Styled from './Styled';
import * as RouteSettings from '../../routes/constants';
import { CONFIG } from '../../config';
import { useActions } from '../../hooks';

const TrashToolkit = (): ReactElement | null => {
  const history = useHistory();
  // in case we just view note and don't intent to change its content
  const curPageIsViewNote = history.location.pathname.includes('view-note');
  const { activeList: list, loading } = useSelector(listSelector) as {
    activeList: NotesList | undefined;
    loading: boolean;
  };
  const { updateListActionAsync } = useActions();

  const { selectedNotes, clearSelectedNotes } = useSelectedNotes();
  const selectedNotesEmpty = selectedNotes.length === 0;
  const trashNotesURL = list
    ? RouteSettings.TRASH.TRASH_NOTES.rootUrl(list.id)
    : CONFIG.baseURL;

  useEffect(() => {
    if (curPageIsViewNote && !list) history.go(-1);
  }, []);

  const deleteNotesFromTrash = () => {
    const newRemovedNotes = list!.removedNotes.filter((note) => {
      const match = selectedNotes.find((n) => n.id === note.id);
      if (match) return undefined;
      return note;
    });
    return newRemovedNotes;
  };

  const restoreNotesHandler = () => {
    if (!list) return;
    const newActiveNotes = [...selectedNotes, ...list.notes];
    const newRemovedNotes = deleteNotesFromTrash();

    updateListActionAsync({
      ...list,
      notes: newActiveNotes,
      removedNotes: newRemovedNotes,
    });
    clearSelectedNotes();
    if (curPageIsViewNote) history.push(trashNotesURL);
  };

  const deleteNotesPermanentlyHandler = () => {
    if (!list) return;
    const newRemovedNotes = deleteNotesFromTrash();

    updateListActionAsync({
      ...list,
      removedNotes: newRemovedNotes,
    });
    clearSelectedNotes();
    if (curPageIsViewNote) history.push(trashNotesURL);
  };

  const returnBackHandler = () => {
    clearSelectedNotes();
    history.go(-1);
  };

  return loading ? null : (
    <Styled.Toolkit>
      <Styled.ToolkitItem
        disabled={false}
        onClick={() => history.push(CONFIG.baseURL)}
        data-testid="r-home"
      >
        <FontAwesomeIcon icon="home" size="lg" />
      </Styled.ToolkitItem>
      <Styled.ToolkitItem
        disabled={selectedNotesEmpty}
        onClick={restoreNotesHandler}
        data-testid="restore"
      >
        <FontAwesomeIcon icon="file-import" size="lg" />
      </Styled.ToolkitItem>
      <Styled.ToolkitItem disabled={selectedNotesEmpty} data-testid="remove">
        <FontAwesomeIcon
          icon="trash-alt"
          size="lg"
          onClick={deleteNotesPermanentlyHandler}
        />
      </Styled.ToolkitItem>
      {curPageIsViewNote && (
        <Styled.ToolkitBackItem
          onClick={returnBackHandler}
          data-testid="goBack"
        >
          <FontAwesomeIcon icon="chevron-circle-left" size="lg" />
        </Styled.ToolkitBackItem>
      )}
    </Styled.Toolkit>
  );
};

export default TrashToolkit;
