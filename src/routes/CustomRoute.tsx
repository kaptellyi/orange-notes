import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router';
import { CONFIG } from '../config';
import { useUser } from '../context/UserContext';
import { withContext } from '../HOC';
import { START_PAGE } from './constants';
import RouteConfig from './types';

type Props = RouteConfig & RouteComponentProps;

const CustomRoute: React.FC<Props> = ({
  component: Component,
  routes,
  context: Context,
  meta,
  ...rest
}) => {
  const { user } = useUser();

  if (meta) {
    if (meta.title) document.title = `${meta.title}`;
    else {
      document.title = CONFIG.title;
    }
  }

  // Redirect to Start in case experienced user tries to access rookie content
  if (!user.isGuideCompleted && !meta?.authNotRequired)
    return <Redirect to={meta?.redirectPath || START_PAGE.path} />;
  // Redirect to Home in case new user tries to access private content
  if (user.isGuideCompleted && meta?.authNotRequired)
    return <Redirect to={CONFIG.baseURL} />;
  return (
    <Route
      render={(props) => {
        const componentEL = (
          <Component {...props} {...rest}>
            {Array.isArray(routes) ? (
              <Switch>
                {routes.map((route, i) => {
                  return <CustomRouteWH {...route} key={i.toString()} />;
                })}
              </Switch>
            ) : null}
          </Component>
        );

        return Context
          ? withContext(Array.isArray(Context) ? [...Context] : [Context])(
              componentEL
            )
          : componentEL;
      }}
    />
  );
};

const CustomRouteWH = withRouter(CustomRoute);

export default CustomRouteWH;
