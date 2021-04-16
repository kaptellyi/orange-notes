import { combineReducers, configureStore } from '@reduxjs/toolkit';
import listsReducer from './slices/listSlice';

export const rootReducer = combineReducers({
  listsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default store;
