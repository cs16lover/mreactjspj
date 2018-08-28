import React, { Component } from 'react';

const PageHelper = {
  changePageTitle(title){
    document.title = title + ' - SoEzy App';
  },
  componentDidMount(Title,fnCallback){
    PageHelper.changePageTitle(Title);
    if(fnCallback!=null){
      // Global.LoadingScreen.show();
      fnCallback();
    }
  },
  // onLoadListFinish(data,error,response,callbackSuccess,cTable){
  //   if(data!=null){
  //     Global.LoadingScreen.hide();
  //     if(callbackSuccess!=null){
  //       callbackSuccess(data,error,response);
  //     }
  //   }
  //   else{
  //     let _msg = 'Có lỗi xảy ra';
  //     if(response!=null && response.StatusCode==0 && response.Msg!=null && response.Msg.length>0){
  //       _msg = response.Msg;
  //     }
      
  //     Global.LoadingScreen.showError(_msg,()=>{
  //       Global.LoadingScreen.show();
  //       if(cTable!=null){
  //         cTable.reload();
  //       }
  //     });
  //   }
  // },
  // onRequestOptions({api,data,fnTryAgain,fnSuccess,fnRebuildOptions,fnLoadOptionsFinish}){
  //   if(api!=null && api.get_options!=null){
  //     api.get_options({
  //       data: data,
  //       successCallBack:(response)=>{
  //         if(fnSuccess!=null){fnSuccess(response);}
  //         let _options = response.Data;
  //         if(fnRebuildOptions!=null){
  //           _options = fnRebuildOptions(_options);
  //         }
  //         if(fnLoadOptionsFinish!=null){
  //           fnLoadOptionsFinish(_options);
  //         }
  //       },
  //       errorCallBack:(error,response)=>{
  //         Global.LoadingScreen.showError(response!=null?response.Msg:'Lỗi lấy Options!',()=>{
  //           Global.LoadingScreen.show();
  //           if(fnTryAgain!=null){fnTryAgain();}
  //         })
  //         // this.setState({error:error!=null?error:response});
  //       }
  //     })
  //   } else { console.warn('onRequestList failed no api or api get_options')}
  // },
  // ConfigScreen: {
  //   key:{
  //     prefix: 'config_',
  //     filter: 'filter',
  //   },
  //   getConfig(key){
  //     if(key!=null){
  //       return M.LocalStorage.getObject(this.key.prefix + key,{});
  //     }
  //   },
  //   setConfig(key,obj){
  //     if(key!=null){
  //       console.log('ConfigScreen setConfig:',this.key.prefix + key,obj);
  //       return M.LocalStorage.setObject(this.key.prefix + key,obj);
  //     }
  //   },
  //   clearAllConfig(){
  //     if(localStorage!=null && Object.keys(localStorage)!=null){
  //       let _arrKeys = Object.keys(localStorage);
  //       for(let e of _arrKeys){
  //         if(e.startsWith(PageHelper.ConfigScreen.key.prefix)==true){
  //           delete localStorage[e];
  //         }
  //       }
  //     }
  //   },
  //   getSavedFilter(key){
  //     if(key!=null){
  //       let _config = this.getConfig(key);
  //       if(_config!=null && _config[this.key.filter]!=null){
  //         return _config[this.key.filter];
  //       }
  //     }
  //   },
  //   clearSavedFilter(key){
  //     if(key!=null){
  //       let _config = this.getConfig(key);
  //       delete _config[this.key.filter];
  //       this.setConfig(key,_config);
  //     }
  //   },
  //   setSavedFilter(key,data){
  //     if(key!=null){
  //       let _config = this.getConfig(key);
  //       _config[this.key.filter] = data;
  //       this.setConfig(key,_config);
  //     }
  //   },
  //   setCustomField({screenCode,key,data}){
  //     if(key!=null){
  //       let _config = this.getConfig(screenCode)||{};
  //       if(_config){
  //         _config[key] = data;
  //       }
  //       this.setConfig(screenCode,_config);
  //     }
  //   },
  //   getCustomField({screenCode,key}){
  //     if(screenCode!=null){
  //       let _config = this.getConfig(screenCode);
  //       if(_config!=null && _config[key]!=null){
  //         return _config[key];
  //       }
  //     }
  //   },
  // },
}

export default PageHelper;