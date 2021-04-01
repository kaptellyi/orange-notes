import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import Checkbox from './Checkbox';
import { CheckboxI } from '../../patterns';
import * as Styled from './Styled';

interface Props {
  checkboxes: CheckboxI[];
  createCheckbox: () => void;
  storeCheckbox: (checkbox: CheckboxI) => void;
  removeCheckbox: (checkbox: CheckboxI) => void;
}

const Checkboxes = ({
  checkboxes,
  createCheckbox,
  storeCheckbox,
  removeCheckbox,
}: Props): ReactElement => {
  const activeCheckboxEls: ReactElement[] = [];
  const completedCheckboxEls: ReactElement[] = [];
  checkboxes.forEach((c) => {
    const el = (
      <Checkbox
        checkbox={c}
        storeCheckbox={storeCheckbox}
        removeCheckbox={removeCheckbox}
        key={c.id}
      />
    );
    if (c.completed) completedCheckboxEls.push(el);
    else activeCheckboxEls.push(el);
  });

  return (
    <Styled.CheckboxesWrapper>
      {activeCheckboxEls}
      <Styled.AddCheckboxWrapper onClick={createCheckbox}>
        <FontAwesomeIcon icon="plus" />
        <small>add a to-do item</small>
      </Styled.AddCheckboxWrapper>
      {completedCheckboxEls}
    </Styled.CheckboxesWrapper>
  );
};

export default Checkboxes;
