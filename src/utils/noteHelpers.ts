import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { firestore } from '../api/firebase';
import { Month } from '../patterns';

export const convertMonth = (monthIndex: number): Month => {
  switch (monthIndex) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      throw Error('invalid month index');
  }
};

export const assignTimeStamp = () => firestore.Timestamp.now().toMillis();

export const assignNoteContent = (text: string) =>
  convertToRaw(
    EditorState.createWithContent(
      ContentState.createFromText(text)
    ).getCurrentContent()
  );
