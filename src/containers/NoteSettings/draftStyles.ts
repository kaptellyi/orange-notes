import { DraftStyles } from '../../patterns';

export const draftStyles: DraftStyles[] = [
  {
    name: 'text-weight',
    icon: 'text-width',
    subStyles: [
      {
        name: 'bold',
        icon: 'bold',
        style: 'BOLD',
      },
      {
        name: 'italic',
        icon: 'italic',
        style: 'ITALIC',
      },
      {
        name: 'underline',
        icon: 'underline',
        style: 'UNDERLINE',
      },
      {
        name: 'cross out',
        icon: 'strikethrough',
        style: 'STRIKETHROUGH',
      },
    ],
  },
  {
    name: 'palette',
    icon: 'palette',
    subStyles: [
      {
        name: 'font color',
        icon: 'brush',
        style: 'font-color',
      },
      {
        name: 'highlight color',
        icon: 'tint',
        style: 'highlight-color',
      },
    ],
  },
  {
    icon: 'align-center',
    name: 'text-align',
    subStyles: [
      {
        name: 'left',
        icon: 'align-left',
        style: 'left',
      },
      {
        name: 'center',
        icon: 'align-center',
        style: 'center',
      },
      {
        name: 'right',
        icon: 'align-right',
        style: 'right',
      },
    ],
  },
  {
    icon: 'stream',
    name: 'block-type',
    subStyles: [
      {
        name: 'bullet list',
        icon: 'list-ul',
        style: 'unordered-list-item',
      },
      {
        name: 'number list',
        icon: 'list-ol',
        style: 'ordered-list-item',
      },
    ],
  },
];
