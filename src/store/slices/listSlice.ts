import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../patterns';
import { AppState } from '../configStore';
import {
  fetchLoadingActions,
  listsLoadingActions,
  LoadingState,
} from '../types';

export interface State {
  lists: Category[];
  activeList: Category | undefined;
}

const initialState: State & LoadingState = {
  loading: true,
  error: null,
  lists: [],
  activeList: undefined,
};

const listSlice = createSlice({
  name: 'listSlice',
  initialState,
  reducers: {
    changeActiveListAction(state, { payload }: PayloadAction<Category>) {
      state.activeList = payload;
      state.error = null;
      sessionStorage.setItem('listId', payload.id);
    },
    setErrorAction(state, { payload }: PayloadAction<Error>) {
      console.error(payload);
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoadingActions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoadingActions.fulfilled, (state, { payload }) => {
      state.lists = payload.lists;
      state.activeList = payload.activeList;
      state.loading = false;
      state.error = null;
      if (payload.activeList)
        sessionStorage.setItem('listId', payload.activeList.id);
    });
    builder.addCase(fetchLoadingActions.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(listsLoadingActions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listsLoadingActions.fulfilled, (state, { payload }) => {
      state.activeList = payload;
      state.loading = false;
    });
    builder.addCase(listsLoadingActions.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default listSlice.reducer;
export const { changeActiveListAction, setErrorAction } = listSlice.actions;
export const listSelector = (state: AppState) => state.listsReducer;
