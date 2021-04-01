import styled from 'styled-components';
import '../../../node_modules/@fortawesome/fontawesome-free/css/solid.css';

export const CheckboxesWrapper = styled.div`
  width: 90%;
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;

  & + & {
    margin-top: 0.5em;
  }
`;

export const CheckboxColumn = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
`;

export const Checkbox = styled.input.attrs({
  className: 'checkbox',
  type: 'checkbox',
})`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  position: relative;
  top: -2px;
  padding: 0.45em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  background-color: #fafafa;
  border: 1px solid #cacece;
  border-radius: 3px;
  margin-right: 0.7em;

  &:checked::after {
    font-family: 'Font Awesome 5 Free';
    position: absolute;
    font-weight: 900;
    content: '\f00c';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.6em;
    font-weight: bold;
    animation: content 0.03s ease-out;
  }

  &:checked {
    border: 2px solid ${({ theme }) => theme.palette.active};
    border-radius: 3px;
  }
`;

export const Input = styled.input<{ completed: boolean }>`
  text-decoration: ${({ completed, theme }) =>
    completed ? `line-through 2.5px ${theme.palette.active}` : 'none'};
`;

export const AddCheckboxWrapper = styled.div`
  margin: 0.7em 0;
  color: ${({ theme }) => theme.palette.darkGray};
  padding: 0.2em;
  border-bottom: 1px solid ${({ theme }) => theme.palette.darkGray};

  *:first-child {
    margin-right: 0.3em;
  }
`;
