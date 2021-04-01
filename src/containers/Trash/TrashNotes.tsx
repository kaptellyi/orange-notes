import React, { ReactElement } from 'react';
import qs from 'query-string';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { NoteI, ListParams, NoteListQuery, NotesList } from '../../patterns';
import * as Styled from './Styled';
import { useSelectedNotes } from '../../context/SelectedNotesCtx';
import Note from '../../components/Note';
import { delayedClick } from '../../utils';
import Loading from '../../UI/Loading';
import ErrorPage from '../../UI/ErrorPage';
import InfoMessage from '../../UI/InfoMessage';
import { listSelector } from '../../store/slices/listSlice';
import * as RouteSettings from '../../routes/constants';

const TrashNotes = (): ReactElement => {
  const { listId } = useParams<ListParams>();
  const { activeList: list, loading, error } = useSelector(listSelector) as {
    activeList: NotesList;
    loading: boolean;
    error: Error;
  };
  const { push } = useHistory();
  const { selectedNotes, selectNote } = useSelectedNotes();

  const isSelected = (note: NoteI) =>
    selectedNotes.find((n) => n.id === note.id) !== undefined;

  const openNote = (note: NoteI) => {
    const query: NoteListQuery = {
      listId,
      noteId: note.id,
      viewType: 'removed',
    };

    selectNote(note);
    push({
      pathname: RouteSettings.TRASH.TRASH_NOTE_SETTINGS.rootUrl,
      search: qs.stringify(query),
    });
  };

  const noteClickHandler = (note: NoteI) => (noteEl: HTMLDivElement) => {
    const time = selectedNotes.length === 0 ? 30 : 0;
    delayedClick(
      noteEl,
      () => selectNote(note),
      () => openNote(note),
      time
    );
  };

  const removedNotes =
    list &&
    list.removedNotes.map((n) => (
      <Styled.RemovedNote key={n.id}>
        <Note
          note={n}
          selected={isSelected(n)}
          clickHandler={noteClickHandler(n)}
          data-testid={isSelected(n) ? 'note-selected' : 'note'}
        />
      </Styled.RemovedNote>
    ));

  if (error)
    return (
      <ErrorPage
        style={{ position: 'absolute' }}
        message="Something happened with list"
      />
    );
  return loading ? (
    <Loading />
  ) : (
    <Styled.RemovedNotes>
      {removedNotes!.length === 0 ? (
        <InfoMessage message="your trash is empty" />
      ) : (
        removedNotes
      )}
    </Styled.RemovedNotes>
  );
};

export default TrashNotes;
