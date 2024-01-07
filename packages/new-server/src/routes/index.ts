//import AuthRoute from './auth.route';
import IndexRoute from './index.route';
//import UsersRoute from './users.route';
import OrganizationRoute from './organization.route';
import EventRoute from './event.route';
import StageRoute from './stage.route';
import SessionRoute from './session.route';

const Routes = [
  //new AuthRoute(),
  new IndexRoute(),
  //new UsersRoute(),
  new OrganizationRoute(),
  new EventRoute(),
  new StageRoute(),
  new SessionRoute(),
];

export default Routes;
