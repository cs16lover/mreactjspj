import React from 'react';
import Loadable from 'react-loadable'
import _Category from './views/_Category/Category';
import _CategoryList from './views/_Category/CategoryList';

function Loading(props) {
  if (props.error) {
    console.log(props);
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else {
    return <div>Loading...</div>;
  }
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/category-list', name: 'CategoryList', component: _CategoryList },
  // { path: '/department', name: 'Department', component: _Category },
];

let _routeOfCategory = _CategoryList.Helper.getRoutes();
for(let i=0;i<_routeOfCategory.length;i++){
  routes.push(_routeOfCategory[i]);
}
export default routes;
