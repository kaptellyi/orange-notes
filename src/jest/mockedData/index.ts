import { NoteI, NotesList } from '../../patterns';
import { assignNoteContent } from '../../utils';

export const mockedUserCtxVal = {
  loading: false,
  user: {
    uid: '123',
    isGuideCompleted: true,
  },
};

export const mockedNoteText = 'note text';
export const mockedNotes: NoteI[] = [
  {
    name: 'Note 1',
    content: assignNoteContent(mockedNoteText),
    id: '1',
    timeStamp: new Date().getTime(),
    pinned: false,
  },
  {
    name: 'Note 2',
    content: assignNoteContent(''),
    id: '2',
    timeStamp: new Date().getTime(),
    pinned: false,
  },
];

export const mockedNoteLists: NotesList[] = [
  {
    icon: 'heart',
    id: '1',
    name: 'List 1',
    type: 'notes',
    notes: mockedNotes,
    removedNotes: mockedNotes,
    createdAt: 0,
  },
  {
    // I love pigs <3
    icon: 'piggy-bank',
    id: '2',
    name: 'List 2',
    type: 'notes',
    notes: [],
    removedNotes: [],
    createdAt: 0,
  },
];
