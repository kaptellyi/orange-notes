import React, { FC } from 'react';

export const withContext = (contextArr: FC[]) => (component: any) => {
  return contextArr.reduce((PrevComp: any, CurrCtx: FC) => {
    return <CurrCtx>{PrevComp}</CurrCtx>;
  }, component);
};
