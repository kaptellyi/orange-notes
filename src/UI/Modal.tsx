import styled, { keyframes } from 'styled-components';
import React, { ReactElement } from 'react';
import { Button } from '../assets/StyledComponents';
import Backdrop from './Backdrop';

interface Props {
  visible: boolean;
  confirmHandler: () => void;
  cancelHandler: () => void;
  text: any;
}

const modalAppear = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -1.2em);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 999;
`;

const Modal = styled.div`
  width: 80%;
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2em;

  background-color: white;
  border: 2px solid black;
  border-radius: 2px;
  animation: ${modalAppear} ease-in-out 0.3s;
  z-index: 2;

  .modal__text {
    text-align: center;
  }

  .modal__buttons {
    margin-top: 0.7em;

    button + button {
      margin-left: 1em;
    }
  }
`;

export const ModalTargetName = styled.span`
  color: orange;
  font-weight: bold;
`;

export default ({
  visible,
  confirmHandler,
  cancelHandler,
  text,
}: Props): ReactElement | null => {
  if (!visible) return null;
  return (
    <Wrapper data-testid="modal-container">
      <Backdrop visible={visible} clickHandler={cancelHandler} />
      <Modal className="TEST">
        <p className="modal__text">{text}</p>
        <div className="modal__buttons">
          <Button onClick={confirmHandler}>Confirm</Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </div>
      </Modal>
    </Wrapper>
  );
};
