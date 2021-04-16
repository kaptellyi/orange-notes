import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createAction,
} from '@reduxjs/toolkit';
import { Category } from '../../patterns';

export const PENDING = 'PENDING';
export const FULFILLED = 'FULFILLED';
export const REJECTED = 'REJECTED';

export interface LoadingState {
  loading: boolean;
  error: Error | null;
}

interface LoadingActions<ActionState> {
  pending: ActionCreatorWithoutPayload;
  fulfilled: ActionCreatorWithPayload<ActionState, string>;
  rejected: ActionCreatorWithPayload<Error, string>;
}

const createLoadingActions = <ActionState>(prefix: string) => {
  return {
    pending: createAction(`${prefix}/${PENDING}`),
    fulfilled: createAction(`${prefix}/${FULFILLED}`),
    rejected: createAction(`${prefix}/${REJECTED}`),
  } as LoadingActions<ActionState>;
};

export const fetchLoadingActions = createLoadingActions<{
  lists: Category[];
  activeList: Category | undefined;
}>('fetchLists');
export const listsLoadingActions = createLoadingActions<Category>('lists');
