import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { center } from '../assets/StyledComponents';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainMsg = styled.p`
  text-align: center;
  font-weight: bold;
  line-height: 1.25rem;
  ${center}
`;

const Link = styled.a`
  color: ${({ theme }) => theme.palette.orange};
`;

const PcView = (): ReactElement => {
  return (
    <Wrapper>
      <MainMsg>
        It seems like you&apos;re using a PC device
        <br />
        Unfortunately this website does not support PC design
        <br />
        Try to open the website with a mobile device or
        <Link
          href="https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome"
          target="_blank"
        >
          &nbsp;toggle mobile view mode
        </Link>
        &nbsp;and reload the page
        <br />
        Thank you for understanding 🧚🏻‍♀️
      </MainMsg>
    </Wrapper>
  );
};

export default PcView;
