import Routes from './_routes';
import Nav from './_nav';
const Config = {
  IsDevMode: true,
  BaseURL: 'http://google.com',
  FireBase: {},
  FireBaseEncrypt: 'z#`qhJdx#;#@H{`Rx@8NpwIQllgcQG5QW{H^^GRPwnspiXxKg@#-#`tuiEnl`ho#;#lsd`bu,d8`dg/ghsdc`rd`qq/bnl#-#e`u`c`rdTSM#;#iuuqr;..lsd`bu,d8`dg/ghsdc`rdhn/bnl#-#qsnkdbuHe#;#lsd`bu,d8`dg#-#runs`fdCtbjdu#;##-#ldrr`fhofRdoedsHe#;#87844284629#|',
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