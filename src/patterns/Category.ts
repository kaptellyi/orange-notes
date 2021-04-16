import { IconName } from '@fortawesome/fontawesome-svg-core';
import { RawDraftContentState } from 'draft-js';

export type NoteSortType = 'column' | 'square';
export type TypeOption = 'notes' | 'checkboxes';
export type OpenListSettingsMannerI = 'create' | 'view';

export * from './Category';

export interface NoteI {
  name: string;
  content: RawDraftContentState;
  timeStamp: number;
  id: string;
  pinned: boolean;
}

export interface CheckboxI {
  id: string;
  text: string;
  completed: boolean;
}

export interface ListSettingsI {
  name: string;
  icon: IconName;
  type: TypeOption;
  id: string;
  createdAt: number;
}

export interface NotesList extends ListSettingsI {
  type: 'notes';
  notes: NoteI[];
  removedNotes: NoteI[];
}

export interface CheckboxesList extends ListSettingsI {
  type: 'checkboxes';
  checkboxes: CheckboxI[];
}

export type Category = NotesList | CheckboxesList;
