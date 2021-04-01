import { Guide } from '../../../patterns';
import createImg from '../../../assets/img/guide/create.webp';
import selectedNotesImg from '../../../assets/img/guide/selected-notes.webp';
import removeImg from '../../../assets/img/guide/remove.webp';
import editorImg from '../../../assets/img/guide/editor.webp';

export const guides: Guide[] = [
  {
    title: 'Notes and checkboxes with multiple icons',
    description:
      'Create to-do lists or notes and fill them with your content. I’m sure you’ll find a suitable icon for yourself!',
    imgPath: createImg,
  },
  {
    title: 'Copy or move notes to the trash',
    description:
      'You can select notes and copy them, to another list or delete them and. To select a note, simply hold your finger for a while on a note and it will do the magic.',
    imgPath: selectedNotesImg,
  },
  {
    title: 'Trash',
    description:
      'It is a place when you can find deleted notes of a specific list. Here you can either remove them forever or restore back to the list.',
    imgPath: removeImg,
  },
  {
    title: 'Rich Editor',
    description:
      'It would be boring if there was no a dope note editor. Here you can find everything: styles, colors, alignments and blocks.',
    imgPath: editorImg,
  },
];
