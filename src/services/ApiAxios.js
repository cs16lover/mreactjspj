import axios from 'axios';
import * as H from '../helpers';

const API = {
  authroize_key: null,
  config: {
    timeOut: 120000,
    pageSize: 10000,
    baseUrl: '',
    keyAuthLocal: 'AUTH_ACCESS_TOKEN_KEY',
  },
  initWithConfig: function(apiConfig){
    console.log('initWithConfig:',apiConfig);
    if(apiConfig){
      if(apiConfig.timeOut){
        API.config.timeOut = apiConfig.timeOut;
      }
      if(apiConfig.baseUrl){
        API.config.baseUrl = apiConfig.baseUrl;
      }
      if(apiConfig.keyAuthLocal){
        API.config.keyAuthLocal = apiConfig.keyAuthLocal;
      }
    }
    console.log(API);
  },
  buildDataForm(json){
    return Object.keys(json).map(function(key) {
      return encodeURIComponent(key) + '=' +
          encodeURIComponent(json[key]);
    }).join('&');
  },
  // getDataList(options={}){
  //   let _data = {
  //     PageSize: this.page_size,
  //     Page: 1,
  //   };
  //   if(options.data!=null){
  //     _data = Object.assign(_data,options.data);
  //   }
  //   return _data;
  // },
  getHeader(ctype,options){
    var _header = {
      'Accept': 'application/json',
      'Content-Type': ctype,
      // 'dataType': 'json',
      //'Authorization': this.authroize_key,
      //'Access-Control-Allow-Origin':'*',
    }
    
    if(options!=null && options.customHeader!=null){
      _header = Object.assign(_header,options.customHeader);
    }

    if(API.authroize_key == null){
      let _savedAccessToken = localStorage.getItem(API.config.keyAuthLocal);
      if(_savedAccessToken!=null){
        API.authroize_key = _savedAccessToken;
      }
    }
    if(API.authroize_key!=null && API.authroize_key.length>0){
      _header['Authorization'] = API.authroize_key;
    }
    return _header;
  },
  // setAuthrozieKey(access_token,token_type){
  //   console.log('Api setAuthrozieKey:',this.authroize_key);
  //   if(access_token==null){
  //     this.authroize_key=null;
  //   }
  //   else{
  //     this.authroize_key = token_type + ' ' + access_token;
  //   }
  // },
  // fetchTest(options){
  //   console.log('fetchTest');
  //   this.fetch('http://ip.jsontest.com/',{},'get','application/json',30000,options);
  // },
  fetch(request,params,method,ctype,timeout,options){
    let _url = API.config.baseUrl + request.url;
    console.log(API,API.config.baseUrl,request,_url);
    let _options = {
      method: method,
      headers: API.getHeader(ctype,options),
      url: _url,
      timeout: timeout,
    }
    
    if(method=='POST'){
      _options['data'] = params;
    }
    if(options['timeout']!=null){
      _options['timeout'] = options['timeout'];
    }
    if(options['onUploadProgress']!=null){
      _options['onUploadProgress'] = options['onUploadProgress'];
    }
    if(options['onDownloadProgress']!=null){
      _options['onDownloadProgress'] = options['onDownloadProgress'];
    }
    
    console.log('Api fetch options:',API,_options);
    axios(_options).then(function(response) {
      // console.log('axios response:',response);
      return response.data;
    }).catch(function (error) {
      console.log('axios error:',error);
      if (error.response) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      }
      throw error;
    })
    .then(response => {
      API.share_success(options,response);
    })
    .catch((error) => {
      API.share_catchError(options,error);
    });
  },
  beforeFetch(request,options = {}){
    if(options!=null){
      options.type = request.type;
      options.request = request;
      options.url = API.config.baseUrl + request.url;
      options.timeStartClient = new Date().getTime();
      if(options.isShowHud==true){
        // G.hud.show();
      }
    }
  },
  afterFetch(options = {},response,error){
    if(options.isShowHud==true){
      // G.hud.hide();
    }
    if(options.isHideMsgError!=true){
      // console.log('afterFetch:',response,error);
      if(error!=null){
        var _msg = "Error!";
        var _status = 0;
        if(error.response!=null){
          _status = error.response.status;//401
          if(error.response.data!=null){
            if(error.response.data.Message!=null)
            {_msg = error.response.data.Message;}
            else if(error.response.data.error_description!=null)
            {_msg = error.response.data.error_description;}
          }
        }
        
        H.UI.Toast.showError(_msg);
        if(_status==401){
          H.Auth.logout(true);
        }
      }
      else if(response!=null && response.StatusCode==0 && response.Msg!=null){
        H.UI.Toast.showError(response.Msg);
      } 
    }
  },
  get(request,options = {}){
    API.beforeFetch(request,options);
    API.fetch(request,'','GET','application/json',API.config.timeOut,options)
  },
  post(request,options = {}){
    API.beforeFetch(request,options);
    let _data = '';
    if(options!=null && options.data!=null){
      _data = JSON.stringify(options.data);
    }
    API.fetch(request,_data,'POST','application/json',API.config.timeOut,options)
  },
  postForm(request,options = {}){
    API.beforeFetch(request,options);
    let _data = '';
    if(options!=null && options.data!=null){
      _data = API.buildDataForm(options.data);
    }
    
    API.fetch(request,_data,'POST','application/x-www-form-urlencoded',API.config.timeOut,options)
  },
  uploadFile(request,options = {}){
    API.beforeFetch(request,options);
    if(options.file!=null){
      let _f = options.file;
      var _formData = new FormData();
      _formData.append("file", _f);
      console.log(_formData);
    }
    else if(options.files!=null){
      let _f = options.files;
      var _formData = new FormData();
      for(let i=0;i<_f.length;i++){
        _formData.append("file[]", _f[i]);
      }
      console.log(_formData);
    }
    
    API.fetch(request,_formData,'POST','multipart/form-data',API.config.timeOut,options)
  },

  //--------- Share Function

  share_success(options = {},response){
    console.log('%c API Success ['+options.type+']:',H.UI.ConsoleLog.api,response);
    API.afterFetch(options,response,null);
    if(options!=null){
      let _successCallBack = options.successCallBack;
      
      let _errorCallBack = options.errorCallBack;
      let _statusCode = response.StatusCode;
      // console.log('share_success: ',_successCallBack,_errorCallBack,_statusCode);
      if(_statusCode==1 || response.access_token!=null){
        if(_successCallBack!=null){
          _successCallBack(response);
        }
      }
      else{
        if(_errorCallBack!=null){
          // FHelper.logError({
          //   options: {
          //     data: options.data,
          //     type: options.type,
          //   },
          //   response: response,
          // })
          _errorCallBack(null,response);
        }
      }
    }
  },
  share_catchError(options,error){
    console.log('%c API Error:',H.UI.ConsoleLog.alert,options,error);
    API.afterFetch(options,null,error);
    let _errorCallBack = options.errorCallBack;
    if(_errorCallBack!=null){
      _errorCallBack(error,null);
    }
    //----------------------------- Log Firebase
    // FHelper.logError({
    //   options: {
    //     data: options.data,
    //     type: options.type,
    //   },
    //   error_stack: error!=null?error.stack:'',
    //   error_message: error!=null?error.message:'',
    // })
  },
}

export default API;