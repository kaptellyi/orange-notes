import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Result from './GuideResult';
import * as Styled from './Styled';
import skipResultOrange from '../../assets/illustrations/guide/skip-result.svg';

const StartPage = (): ReactElement => {
  const { push } = useHistory();
  const [component, setComponent] = useState<JSX.Element | undefined>(
    undefined
  );

  const skipHandler = () => {
    setComponent(
      <Result msg="Look at this hero!" imgPath={skipResultOrange} />
    );
  };
  const startHandler = () => push('/guide');

  const initialStartPage = (
    <>
      <Styled.InfoWrapper>
        <Styled.TextBox>
          <Styled.Title>Hi, 👋</Styled.Title>
          <Styled.Description>
            I’m mr. Orange and my job is to show you key features of the app!
          </Styled.Description>
        </Styled.TextBox>
        <Styled.Orange viewBox="0 0 10 10" />
      </Styled.InfoWrapper>
      <Styled.Buttons>
        <button type="button" onClick={startHandler}>
          start
        </button>
        <button type="button" onClick={skipHandler}>
          skip
        </button>
      </Styled.Buttons>
    </>
  );
  // avoid stack overflow
  if (!component) setComponent(initialStartPage);

  return <>{component}</>;
};

export default StartPage;
