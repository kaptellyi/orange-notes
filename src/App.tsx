import React, { useEffect, useState } from 'react';
import { useUser } from './context/UserContext';
import { useActions } from './hooks';
import { checkIsMobal } from './utils';
import Routes from './routes';
import PcView from './components/PcView';

function App() {
  // const isMobile =
  const [isMobal, setIsMobal] = useState(checkIsMobal());
  const { user } = useUser();
  const { subscribeListsAction } = useActions();

  useEffect(() => {
    if (!user && !isMobal) return;

    let unsubscribe;

    subscribeListsAction({
      user,
      setUnsubscribe: (cb) => {
        unsubscribe = cb;
      },
    });

    return unsubscribe;
  }, [user, isMobal]);

  window.onresize = () => setIsMobal(checkIsMobal());

  return !isMobal ? <PcView /> : <Routes />;
}

export default App;
