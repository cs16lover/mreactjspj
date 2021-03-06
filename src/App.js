import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as H from './helpers';
import ApiAxios from './services/ApiAxios';
import MyDialog from './components/MyDialog';

import './App.css';
// ----------------------------------- Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// -----------------------------------  Containers
// import { DefaultLayout } from './containers';
import { DefaultLayout, Login } from './lykun/containers';
// Pages
// import { Login, Page404, Page500, Register } from './views/Pages';
// import Login from './containers/Login/Login';
// 
// ----------------------------------- Config
// import Config from './views/MWorkflow/config';
import Config_Lykun from './lykun/_config';
const Config = Config_Lykun;
//Init From Config
try {
  let _configFB = JSON.parse(H.M.xorCrypt(Config.FireBaseEncrypt,Config.EncryptKeyXor));
  console.warn("_configFB:",_configFB);
  H.F.initWithConfig(_configFB);// Firebase
} catch (error) {
  console.warn("Parse json error:",error,Config);
}

ApiAxios.initWithConfig(Config.Api);
H.Auth.initWithConfig(Config.Auth);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    H.Auth.isLoggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  render() {
    const containerStyle = {
      zIndex: 1999
    };
    
    return (
      <div>
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
        <MyDialog />
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            {/* <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} /> */}
            {/* <Route path="/" name="Home" component={DefaultLayout} /> */}
            <PrivateRoute path="/" name="Home" component={DefaultLayout}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
