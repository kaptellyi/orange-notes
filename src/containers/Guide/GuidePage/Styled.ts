import styled from 'styled-components';
import { breakpoints } from '../../../assets/StyledComponents';
import * as RootStyles from '../Styled';

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

export const Content = styled.div`
  height: 100%;
  padding: 1em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  * + * {
    margin-top: 0.4em;
  }

  @media ${breakpoints.md}, (orientation: landscape) {
    flex-direction: row;

    * + * {
      margin-left: 0.4em;
    }
  }
`;

export const ExampleImg = styled.img`
  height: auto;
  width: 65%;
  box-shadow: 35px 10px 50px 10px rgba(0, 0, 0, 0.1);

  @media ${breakpoints.md} {
    height: 60%;
  }

  @media (orientation: landscape) {
    height: 80%;
  }
`;

export const DescriptionContainer = styled.div``;

export const Title = styled(RootStyles.Title)``;

export const Description = styled(RootStyles.Description)``;
