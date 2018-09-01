import G from './G';
const Auth = {
  Config: {
    keyAuthLocal: 'AUTH_ACCESS_TOKEN_KEY',
    keyAuthToken: 'AUTH_TOKEN',
  },
  initWithConfig: function(cf){
    console.log('initWithConfig:',cf);
    if(cf){
      Auth.Config = Object.assign(Auth.Config,cf);
    }
    Auth.loadFromLocal();
    console.log(Auth);
  },
  loadFromLocal: function(){
    let _authToken = localStorage.getItem(Auth.Config.keyAuthToken);
    if(_authToken){
      try {
        let _authTokenObj = JSON.parse(_authToken);
        Auth.Token = _authTokenObj;
      } catch (error) {
        console.console.warn('loadFromLocal error:',error);
      }
    }
    console.log('loadFromLocal:',Auth.Token);
  },
  saveToLocal: function(){
    let _aceessToken = `${Auth.Token.type} ${Auth.Token.key}`;
    localStorage.setItem(Auth.Config.keyAuthLocal,_aceessToken);
    localStorage.setItem(Auth.Config.keyAuthToken,JSON.stringify(Auth.Token));
  },
  clearSavedLocal: function(){
    localStorage.clear();
    localStorage.removeItem(Auth.Config.keyAuthLocal);
    localStorage.removeItem(Auth.Config.keyAuthToken);
  },
  METHOD:{
    NORMAL: 'NORMAL',
    GOOGLE: 'GOOGLE',
    FACEBOOK: 'FACEBOOK',
  },
  Token:{
    key: null,
    type: 'bearer',
    method: null,
  },
  Credential:{

  },
  Info:{

  },
  isLoggedIn(){
    console.log('isLoggedIn:',Auth.Token);
    if(Auth.Token.key){
      return true;
    }
    return false;
  },
  getTokenKey(){
    return Auth.Token.key;
  },
  getTokenWithBearer(){
    return Auth.Token.type + ' ' + Auth.Token.key;
  },
  login({tokenKey,tokenType,method,}){
    Auth.Token.key = tokenKey;
    Auth.Token.type = tokenType;
    Auth.Token.method = method;
    //Update Service with new token

    Auth.saveToLocal();

    //go to home
    G.goToHome();
  },
  loginWithFirebase(result){
    console.log('loginWithFirebase:',result);
    if(result){
      if(result.credential){
        Auth.login({
          tokenKey: result.credential.accessToken,
          tokenType: 'bearer',
          method: result.credential.signInMethod
        });
      }
    }
  },
  logout(){
    Auth.Token.key = null;
    Auth.Token.type = 'bearer';
    Auth.Token.method = null;

    Auth.clearSavedLocal();
  },
}

export default Auth;