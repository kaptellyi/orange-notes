import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useRef, useState } from 'react';
import { CheckboxI } from '../../patterns';
import * as Styled from './Styled';

interface Props {
  checkbox: CheckboxI;
  storeCheckbox: (checkbox: CheckboxI) => void;
  removeCheckbox: (checkbox: CheckboxI) => void;
}

const Checkbox = ({
  checkbox,
  storeCheckbox,
  removeCheckbox,
}: Props): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(undefined!);
  const [checkboxText, setCheckboxText] = useState(checkbox.text);

  const gatherInfo = (): CheckboxI => ({
    ...checkbox,
    text: checkboxText,
  });

  const checkHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (inputRef.current.value.trim().length === 0) return e.preventDefault();
    storeCheckbox({ ...gatherInfo(), completed: !checkbox.completed });
  };

  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCheckboxText(target.value);
  };

  const inputBlurHandler = () => {
    storeCheckbox(gatherInfo());
  };

  return (
    <Styled.CheckboxContainer data-testid="checkbox">
      <Styled.CheckboxColumn>
        <Styled.Checkbox
          defaultChecked={checkbox.completed}
          onClick={(e) => checkHandler(e)}
        />
        <Styled.Input
          completed={checkbox.completed}
          value={checkboxText}
          readOnly={checkbox.completed}
          onInput={(e) => inputHandler(e)}
          onBlur={inputBlurHandler}
          ref={inputRef}
        />
      </Styled.CheckboxColumn>
      <FontAwesomeIcon
        icon="trash-alt"
        size="lg"
        onClick={() => {
          removeCheckbox(checkbox);
        }}
        data-testid="checkbox-remove"
      />
    </Styled.CheckboxContainer>
  );
};

export default Checkbox;
