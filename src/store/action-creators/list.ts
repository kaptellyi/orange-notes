import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { db } from '../../api';
import { Category } from '../../patterns';
import { AppState } from '../configStore';
import { fetchLoadingActions, listsLoadingActions } from '../types';
import { changeActiveListAction, setErrorAction } from '../slices/listSlice';

interface SubscribeAction {
  user: firebase.default.User;
  setUnsubscribe: (unsubscribe: () => void) => void;
}

export const subscribeListsAction = ({
  user,
  setUnsubscribe,
}: SubscribeAction) => {
  return async (
    dispatch: Dispatch<PayloadAction<any>>,
    getState: () => AppState
  ) => {
    dispatch(fetchLoadingActions.pending());
    // prevent from reading all lists on the next updates
    let firstLoad = true;
    const collection = db.collection('lists');

    const unsubscribe = collection
      .where('uid', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const sessionStoredListId = sessionStorage.getItem('listId');
        const state = getState().listsReducer;
        // First load
        if (firstLoad) {
          firstLoad = false;
          const lists = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as Category[];
          // Use active list from store or session storage
          let activeList: Category | undefined = undefined;
          if (state.activeList) {
            activeList = lists.find((l) => l.id === state.activeList!.id);
          } else if (sessionStoredListId) {
            activeList = lists.find((l) => l.id === sessionStoredListId);
          }
          activeList = activeList || lists[0];

          dispatch(
            fetchLoadingActions.fulfilled({
              lists,
              activeList,
            })
          );
          // next loads
        } else {
          dispatch(fetchLoadingActions.pending());
          const listsCopy = [...state.lists];
          let activeList = state.activeList;
          // update changes
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const list = {
                ...change.doc.data(),
                id: change.doc.id,
              } as Category;
              listsCopy.unshift(list);
              activeList = list;
            } else if (change.type === 'modified') {
              const newList = {
                ...change.doc.data(),
                id: change.doc.id,
              } as Category;
              listsCopy.splice(change.oldIndex, 1, newList);
              activeList = newList;
            } else if (change.type === 'removed') {
              listsCopy.splice(change.oldIndex, 1);
              if (listsCopy.length === 0) {
                activeList = undefined;
              } else activeList = listsCopy[0];
            }
          });

          dispatch(
            fetchLoadingActions.fulfilled({
              lists: listsCopy,
              activeList: activeList || listsCopy[0],
            })
          );
        }
      });

    // return unsubscribe function
    setUnsubscribe(unsubscribe);
  };
};

const ListError: Error = {
  name: 'Firebase',
  message: 'Firebase doc was not created',
};

export const createListActionAsync = (list: Category, uid: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(listsLoadingActions.pending());
    try {
      await db.collection('lists').add({
        ...list,
        uid,
      });
    } catch (err) {
      console.error(err);
      dispatch(listsLoadingActions.rejected(ListError));
    }
  };
};

export const updateListActionAsync = (
  list: Category,
  initPending?: boolean
) => {
  return async (dispatch: Dispatch<PayloadAction<any>>) => {
    if (initPending) dispatch(listsLoadingActions.pending());
    try {
      await db.collection('lists').doc(list.id).update(list);
    } catch (err) {
      console.error(err);
      dispatch(listsLoadingActions.rejected(ListError));
    }
  };
};

export const deleteListActionAsync = (id: string) => {
  return async (dispatch: Dispatch<PayloadAction<any>>) => {
    dispatch(listsLoadingActions.pending());
    try {
      await db.collection('lists').doc(id).delete();
    } catch (err) {
      console.error(err);
      dispatch(listsLoadingActions.rejected(ListError));
    }
  };
};

export const setActiveListAction = (listId: string) => {
  return async (dispatch: Dispatch<PayloadAction<any>>) => {
    dispatch(listsLoadingActions.pending());
    try {
      const doc = await await db.collection('lists').doc(listId).get();
      const activeList = doc.data() as Category;
      dispatch(listsLoadingActions.fulfilled(activeList));
    } catch (err) {
      console.error(err);
      dispatch(listsLoadingActions.rejected(ListError));
    }
  };
};

// reducer's actions
export { changeActiveListAction, setErrorAction };
