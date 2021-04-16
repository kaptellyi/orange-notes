import React, { ReactElement, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Content from '../Content';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';
import { useNoteSort } from '../../context/NoteSortContext';
import { useSelectedNotes } from '../../context/SelectedNotesCtx';
import { useUser } from '../../context/UserContext';
import ListSettings from '../../components/ListSettings';
import {
  Category,
  NoteI,
  NotesList,
  OpenListSettingsMannerI,
} from '../../patterns';
import { listSelector } from '../../store/slices/listSlice';
import * as Styled from './Styled';
import ErrorPage from '../../UI/ErrorPage';
import Loading from '../../UI/Loading';
import * as RouteSettings from '../../routes/constants';
import { useActions } from '../../hooks';

const Home = (): ReactElement => {
  const { user } = useUser();
  const history = useHistory();
  const { lists, activeList, loading, error } = useSelector(listSelector);
  const {
    changeActiveListAction,
    createListActionAsync,
    deleteListActionAsync,
    updateListActionAsync,
  } = useActions();
  const { selectedNotes, clearSelectedNotes } = useSelectedNotes();
  const {
    sortType,
    toggleSortType,
    sortFilteredNotes,
    clearFilteredNotes,
  } = useNoteSort();
  const [settingsInfo, setSettingsInfo] = useState(activeList);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const dispatch = useDispatch();

  const createListHandler = useCallback((list: Category) => {
    createListActionAsync(list, user.uid);
  }, []);
  const editListHandler = useCallback((list: Category) => {
    updateListActionAsync(list);
  }, []);
  const changeActiveListHandler = (newList: Category) => {
    if (selectedNotes.length && newList.type === 'notes') {
      copyNotesHandler(newList, selectedNotes);
    } else dispatch(changeActiveListAction(newList));
    clearHandler();
  };

  const openListSettingsHandler = (
    openListSettingsManner: OpenListSettingsMannerI
  ) => {
    // same component iss used for both creating a list and viewing list's settings
    // so it should fill fields with data in the second case
    if (openListSettingsManner === 'create') setSettingsInfo(undefined);
    else setSettingsInfo(activeList);
    setSidebarVisible(false);
    setSettingsVisible(true);
  };
  const deleteCurrentListHandler = useCallback(() => {
    deleteListActionAsync(activeList!.id);
  }, [activeList]);

  const removeNotesHandler = (selectedNotes: NoteI[]) => {
    if (!activeList || activeList.type !== 'notes') return;
    const removedNotes: NoteI[] = [];
    const newNotes = activeList.notes.filter((n) => {
      const matched = selectedNotes.find((note) => note.id === n.id);
      if (matched) {
        removedNotes.push(matched);
        return undefined;
      }
      return n;
    });

    editListHandler({
      ...activeList,
      notes: newNotes,
      removedNotes: [...activeList.removedNotes, ...removedNotes],
    });
    clearSelectedNotes();
  };

  const copyNotesHandler = (
    newActiveList: NotesList,
    selectedNotes: NoteI[]
  ) => {
    const curList = activeList as NotesList;
    const oldList = {
      ...curList,
      notes: curList.notes.filter((curNote) =>
        selectedNotes.find((filterNote) => curNote.id !== filterNote.id)
      ),
    };
    const newList = {
      ...newActiveList,
      notes: [...selectedNotes, ...newActiveList.notes],
    };
    // the last modified list becomes active one
    editListHandler(oldList);
    editListHandler(newList);
    setSidebarVisible(false);
  };

  const searchHandler = (value: string) => {
    const list = activeList as NotesList;
    sortFilteredNotes(value, list.notes);
  };

  const openTrashHandler = () =>
    history.push(RouteSettings.TRASH.TRASH_NOTES.rootUrl(activeList!.id));

  const clearHandler = () => {
    clearSelectedNotes();
    clearFilteredNotes();
  };

  const closeSettings = useCallback(() => setSettingsVisible(false), []);

  return loading ? (
    <Loading />
  ) : (
    <Styled.Home>
      <ListSettings
        isOpen={settingsVisible}
        activeList={settingsInfo}
        closeSettings={closeSettings}
        createList={createListHandler}
        editList={editListHandler}
        deleteCurrentList={deleteCurrentListHandler}
      />
      <Navigation
        sortType={sortType}
        list={activeList}
        selectedNotesNotEmpty={selectedNotes.length !== 0}
        toggleSidebar={() => setSidebarVisible((prev) => !prev)}
        openListSettings={() => openListSettingsHandler('view')}
        removeSelectedNotes={() => removeNotesHandler(selectedNotes)}
        clearSelectedNotes={clearSelectedNotes}
        searchNotes={searchHandler}
        toggleSortType={toggleSortType}
      />
      <Sidebar
        isOpen={sidebarVisible}
        lists={lists}
        activeList={activeList || lists[0]}
        selectedNotes={selectedNotes}
        closeSidebar={() => setSidebarVisible(false)}
        createList={() => openListSettingsHandler('create')}
        changeList={changeActiveListHandler}
        openTrash={openTrashHandler}
      />
      {error ? <ErrorPage /> : activeList && <Content />}
    </Styled.Home>
  );
};

export default Home;
