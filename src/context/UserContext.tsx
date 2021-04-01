import React, { ReactElement, useEffect, useState } from 'react';
import { auth, db } from '../api';
import { useCreateContext } from '../hooks';
import { AppUser } from '../patterns';
import ErrorPage from '../UI/ErrorPage';

interface CtxProps {
  user: AppUser;
  loading: boolean;
  updateUser: (user: AppUser) => void;
}

const [useUser, CtxProvider] = useCreateContext<CtxProps>();

const AuthUserProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}): ReactElement => {
  const [user, setUser] = useState<AppUser>(undefined!);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;

      db.collection('guide')
        .where('uid', '==', user.uid)
        .get()
        .then((u) => {
          setUser({
            ...user,
            isGuideCompleted: !u.empty,
          });
          setLoading(false);
        });

      return unsubscribe;
    });

    return unsubscribe;
  }, []);

  (async () => {
    auth.signInAnonymously();
  })().catch((err) => {
    setError(err);
  });

  const updateUser = (user: AppUser) => setUser(user);

  return error ? (
    <ErrorPage message={error.message} />
  ) : (
    <CtxProvider value={{ user, loading, updateUser }}>
      {!loading && children}
    </CtxProvider>
  );
};

export { useUser, AuthUserProvider };
