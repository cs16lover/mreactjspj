import Routes from './_routes';
import Nav from './_nav';
const Config = {
  IsDevMode: true,
  BaseURL: 'http://google.com',
  FireBase: {},
  FireBaseEncrypt: "",
  Title: 'Lykun',
  AppPrefix: 'LK_',
  EncryptKeyXor: 1,
  Routes: Routes,
  Nav: Nav,
  Api:{
    // timeOut: 120000,
    // pageSize: 1000,
    // baseUrl: Config.BaseURL,
  },
  Auth:{
    //keyAuthLocal
  },
}
Config.Api = {
  baseUrl: Config.BaseURL,
  keyAuthLocal: Config.AppPrefix + 'AUTH',
}
Config.Auth = {
  keyAuthLocal: Config.AppPrefix + 'AUTH',
  keyAuthToken: Config.AppPrefix + 'TOKEN',
}

export default Config;