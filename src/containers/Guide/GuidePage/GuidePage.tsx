import React, { ReactElement } from 'react';
import { Guide } from '../../../patterns';
import * as Styled from './Styled';

const GuidePage = (guide: Guide): ReactElement => {
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.ExampleImg
          src={guide.imgPath}
          alt="create guide - example image"
        />
        <Styled.DescriptionContainer>
          <Styled.Title>{guide.title}</Styled.Title>
          <Styled.Description>{guide.description}</Styled.Description>
        </Styled.DescriptionContainer>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default GuidePage;
