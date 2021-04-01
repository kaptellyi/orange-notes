import React, { ReactElement } from 'react';
import qs from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useNoteSort } from '../../context/NoteSortContext';
import { useSelectedNotes } from '../../context/SelectedNotesCtx';
import {
  Category,
  CheckboxesList,
  CheckboxI,
  NoteI,
  NoteListQuery,
} from '../../patterns';
import { listSelector } from '../../store/slices/listSlice';
import Notes from '../../components/Notes';
import { delayedClick } from '../../utils';
import Checkboxes from '../../components/Checkboxes';
import * as Styled from './Styled';
import InfoMessage from '../../UI/InfoMessage';
import * as RouteSettings from '../../routes/constants';
import { useActions } from '../../hooks/useActions';

const Content = (): ReactElement => {
  const { push } = useHistory();
  const list = useSelector(listSelector).activeList as Category;
  const { filteredNotes, sortType } = useNoteSort();
  const { selectedNotes, selectNote } = useSelectedNotes();
  const { updateListActionAsync } = useActions();

  const openNote = (note: NoteI) => {
    const query: NoteListQuery = {
      listId: list.id,
      noteId: note.id,
      viewType: 'normal',
    };
    push({
      pathname: RouteSettings.NOTE_SETTINGS.rootUrl,
      search: qs.stringify(query),
    });
  };

  const pushToCreateNote = () => {
    const query: NoteListQuery = {
      listId: list.id,
      viewType: 'normal',
    };

    push({
      pathname: RouteSettings.NOTE_SETTINGS.rootUrl,
      search: qs.stringify(query),
    });
  };

  const selectNoteHandler = (note: NoteI) => {
    if (note.pinned) return;
    selectNote(note);
  };

  const clickNoteHandler = (note: NoteI, noteEl: HTMLDivElement) => {
    // prevent from waiting if there are selected notes
    const time = selectedNotes.length ? 0 : 30;
    delayedClick(
      noteEl,
      () => {
        selectNoteHandler(note);
      },
      () => {
        openNote(note);
      },
      time
    );
  };

  const createCheckboxHandler = () => {
    const oldList = list as CheckboxesList;
    const newCheckbox: CheckboxI = {
      id: new Date().getTime().toString(),
      completed: false,
      text: '',
    };
    const newActiveList = {
      ...oldList,
      checkboxes: [newCheckbox, ...oldList.checkboxes],
    };
    updateListActionAsync(newActiveList);
  };

  const storeCheckboxHandler = (checkbox: CheckboxI) => {
    const oldList = list as CheckboxesList;
    const updatedCheckboxes = oldList.checkboxes.map((c) =>
      c.id === checkbox.id ? checkbox : c
    );

    updateListActionAsync({ ...oldList, checkboxes: updatedCheckboxes });
  };

  const removeCheckboxHandler = (checkbox: CheckboxI) => {
    const oldList = list as CheckboxesList;
    const updatedCheckboxes = oldList.checkboxes.filter(
      (c) => c.id !== checkbox.id
    );

    updateListActionAsync({ ...oldList, checkboxes: updatedCheckboxes });
  };

  const content =
    list.type === 'checkboxes' ? (
      <Checkboxes
        checkboxes={list.checkboxes}
        createCheckbox={createCheckboxHandler}
        storeCheckbox={storeCheckboxHandler}
        removeCheckbox={removeCheckboxHandler}
      />
    ) : (
      <>
        {list.notes.length === 0 ? (
          <InfoMessage message="there is no any note yet" />
        ) : (
          <Notes
            notes={filteredNotes || list.notes}
            isSelected={(note: NoteI) =>
              selectedNotes.find((n) => n.id === note.id) !== undefined
            }
            sortType={sortType}
            clickNote={clickNoteHandler}
          />
        )}
        <Styled.AddNoteWrapper
          data-testid="test-add"
          onClick={pushToCreateNote}
          disabled={selectedNotes.length !== 0}
        >
          <Styled.AddNote size="2x" icon="plus" />
        </Styled.AddNoteWrapper>
      </>
    );

  return <Styled.Content>{content}</Styled.Content>;
};

export default Content;
