import React from 'react';
import { Redirect } from 'react-router-dom';
import Welcome from '../containers/Guide/StartPage';
import { NoteSortTypeProvider } from '../context/NoteSortContext';
import { SelectedNotesProvider } from '../context/SelectedNotesCtx';
import ErrorPage from '../UI/ErrorPage';
import { GUIDE, HOME, NOTE_SETTINGS, START_PAGE, TRASH } from './constants';
import RouteConfig from './types';

const GuidePage = React.lazy(() => import('../containers/Guide/GuideSlider'));
const Home = React.lazy(() => import('../containers/Home'));
const NoteSettings = React.lazy(() => import('../containers/NoteSettings'));
const TrashLayout = React.lazy(() => import('../Layout/TrashLayout'));
const TrashNotes = React.lazy(() => import('../containers/Trash'));

const routes: RouteConfig[] = [
  {
    path: START_PAGE.path,
    exact: true,
    component: Welcome,
    meta: {
      authNotRequired: true,
      redirectPath: START_PAGE.path,
    },
  },
  {
    path: GUIDE.path,
    exact: true,
    component: GuidePage,
    meta: {
      authNotRequired: true,
      redirectPath: GUIDE.path,
    },
  },
  {
    path: HOME.path,
    exact: true,
    context: [NoteSortTypeProvider, SelectedNotesProvider],
    component: Home,
    meta: {
      title: HOME.name,
    },
  },
  {
    path: NOTE_SETTINGS.path,
    exact: true,
    component: NoteSettings,
    meta: {
      title: NOTE_SETTINGS.name,
    },
  },
  {
    path: TRASH.TRASH.path,
    component: TrashLayout,
    context: SelectedNotesProvider,
    meta: {
      title: TRASH.TRASH.name,
    },
    routes: [
      {
        path: TRASH.TRASH_NOTES.path,
        exact: true,
        component: TrashNotes,
      },
      {
        path: TRASH.TRASH_NOTE_SETTINGS.path,
        exact: true,
        component: NoteSettings,
      },
    ],
  },
  {
    path: '/404',
    component: () => (
      <ErrorPage
        style={{ width: '100vw', height: '100vh' }}
        message="page was not found"
      />
    ),
    exact: true,
    meta: {
      title: 'Error',
    },
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;

// export default (
//   <Switch>
//     <Route path="/start" exact component={Welcome} />
//     <Route path="/guide" exact component={GuideSlider} />
//     <Route
//       path="/"
//       exact
//       render={() => (
//         <NoteSortTypeProvider>
//           <SelectedNotesProvider>
//             <Home />
//           </SelectedNotesProvider>
//         </NoteSortTypeProvider>
//       )}
//     />
//     <Route exact path="/note-settings:id?" component={NoteSettings} />
//     <Route path="/trash/">
//       <SelectedNotesProvider>
//         <Route path="/trash/:listId">
//           <TrashToolkit />
//         </Route>
//         <Route path="/trash/:listId/notes" exact>
//           <TrashNotes />
//         </Route>
//       </SelectedNotesProvider>
//       <Route exact path="/trash/view-note:id?" component={NoteSettings} />
//     </Route>
//     <Route
//       path="/404"
//       render={() => (
//         <ErrorPage
//           style={{ width: '100vw', height: '100vh' }}
//           message="Page wasn't found"
//         />
//       )}
//     />
//     <Redirect to="/404" />
//   </Switch>
// );
