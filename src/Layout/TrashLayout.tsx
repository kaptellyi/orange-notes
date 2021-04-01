import React, { ReactElement } from 'react';
import TrashToolkit from '../containers/Trash/TrashToolkit';

interface Props {
  children: any;
}

const TrashLayout = ({ children }: Props): ReactElement => {
  return (
    <>
      <TrashToolkit />
      {children}
    </>
  );
};

export default TrashLayout;
