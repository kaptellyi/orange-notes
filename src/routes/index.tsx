import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import CustomRoute from './CustomRoute';
import routes from './routes';
import { CONFIG } from '../config';

const Routes = () => {
  return (
    <Router basename={CONFIG.baseURL}>
      <Suspense fallback={<></>}>
        <Switch>
          {routes.map((route, i) => (
            <CustomRoute {...route} key={i.toString()} />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
