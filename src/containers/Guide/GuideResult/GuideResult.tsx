import React, { ReactElement, useEffect, useState } from 'react';
import { db } from '../../../api';
import { useUser } from '../../../context/UserContext';
import { useActions } from '../../../hooks';
import { NotesList } from '../../../patterns';
import { assignNoteContent, assignTimeStamp } from '../../../utils';
import * as Styled from './Styled';

interface Props {
  msg: string;
  imgPath: string;
  initRedirect?: boolean;
}

let countToRedirect: NodeJS.Timeout;
const Result = ({ msg, imgPath, initRedirect }: Props): ReactElement => {
  const { user, updateUser } = useUser();
  const { createListActionAsync } = useActions();
  const [secUntilRedirect, setSecUntilRedirect] = useState(5);

  useEffect(() => {
    if (initRedirect === false) return;
    countToRedirect = setInterval(
      () => setSecUntilRedirect((prevNum) => prevNum - 1),
      1000
    );

    return () => clearInterval(countToRedirect);
  }, [initRedirect]);

  useEffect(() => {
    if (secUntilRedirect !== 0) return;
    // mark user as the one who has completed the guide
    // it'll automatically redirect user to Home page
    db.collection('guide')
      .add({ isGuideCompleted: true, uid: user.uid })
      .then(() => {
        updateUser({
          ...user,
          isGuideCompleted: true,
        });
        initFirstList(user.uid);
      })
      .catch((err) => {
        throw new Error(err);
      });
    clearInterval(countToRedirect);
  }, [secUntilRedirect]);

  const initFirstList = (uid: string) => {
    const list: NotesList = {
      name: 'Orange Notes',
      icon: 'file',
      type: 'notes',
      id: '',
      notes: [
        {
          name: '🍊 This is a tangerine 🍊',
          id: assignTimeStamp().toString(),
          content: assignNoteContent(
            'You can change or delete me. You decide what you want!'
          ),
          timeStamp: assignTimeStamp(),
          pinned: false,
        },
      ],
      removedNotes: [],
      createdAt: assignTimeStamp(),
    };
    createListActionAsync(list, uid);
  };

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.ResultMessage>{msg}</Styled.ResultMessage>
        <Styled.ResultORange imgPath={imgPath} />
      </Styled.Content>
      <Styled.RedirectAlert>
        Redirect in&nbsp;
        <span>{secUntilRedirect}</span>
      </Styled.RedirectAlert>
    </Styled.Wrapper>
  );
};

export default Result;
