import React, { Provider } from 'react';

type UseCtxTuple<T> = [() => T, Provider<T | undefined>];

export const useCreateContext = <T>(): UseCtxTuple<T> => {
  const ctx = React.createContext<T | undefined>(undefined);
  const useCtx = () => {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  };
  return [useCtx, ctx.Provider];
};
