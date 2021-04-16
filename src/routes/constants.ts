export const START_PAGE = {
  name: '',
  path: '/start',
};

export const GUIDE = {
  name: '',
  path: '/guide',
};

export const HOME = {
  name: 'Home',
  path: '/',
};

export const NOTE_SETTINGS = {
  name: 'Note Settings',
  path: '/note-settings:noteQuery?',
  rootUrl: '/note-settings',
};

export const TRASH = {
  TRASH: {
    name: 'Trash',
    path: '/trash:listId?',
  },
  TRASH_NOTES: {
    name: '',
    path: '/trash/:listId/notes',
    rootUrl: (listId: string) => `/trash/${listId}/notes`,
  },
  TRASH_NOTE_SETTINGS: {
    name: NOTE_SETTINGS.name,
    path: '/trash/view-note:noteQuery?',
    rootUrl: '/trash/view-note',
  },
};

export const ERROR = {
  name: 'Error',
  path: '/404',
};
