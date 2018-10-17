import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import withSession from '../Session/withSession';

import * as routes from '../../constants/routes';
import history from '../../constants/history';

const App = ({ session, loading, refetch }) => (
  <Router history={history} >
    <div>
      <Navigation session={session} />

      <hr />
      <Switch>
        <Route
          exact
          path={routes.LANDING}
          component={LandingPage}
        />
        <Route
          path={routes.SIGN_UP}
          component={() => <SignUpPage refetch={refetch} />}
        />
        <Route
          path={routes.SIGN_IN}
          component={() => <SignInPage session={session} loading={loading} refetch={refetch} />}
        />
        <Route
          path={routes.ACCOUNT}
          component={AccountPage}
        />
        <Route
          path={routes.ADMIN}
          component={AdminPage}
        />
      </Switch>
    </div>
  </Router>
);

export default withSession(App);
