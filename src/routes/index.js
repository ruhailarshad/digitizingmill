// import React from 'react';

// import { Route, Switch } from 'react-router-dom';

// import RouteConfig from './RouteConfig';

// export default function BaseRouter() {
//   return (
//     <Switch>
//       {RouteConfig.commonAppRoutes.map((route, index) => {
//         return <Route key={route.path} component={route.component} exact path={route.path} />;
//       })}
//     </Switch>
//   );
// }
import {useRoutes} from 'react-router-dom'
import routes from './PrivateRoute';
import { accessTokenKey } from '../constants/localStorageKeys';

const Routes = () => {
  const isLoggedIn = localStorage.getItem(accessTokenKey);
  const authRoutes = useRoutes(routes(true))
  return authRoutes
}

export default Routes