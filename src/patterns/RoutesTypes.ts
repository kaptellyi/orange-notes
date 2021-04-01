import { ParsedQuery } from 'query-string';

export interface Guide {
  title: string;
  description: string;
  imgPath: string;
}

export interface GuideResultState {
  msg: string;
  imgPath: string;
}

export interface ListParams {
  listId: string;
}

export interface NoteQuery extends ParsedQuery<string | undefined> {
  Noted?: string;
  viewType: 'normal' | 'removed';
}

export type NoteListQuery = ListParams & NoteQuery;
