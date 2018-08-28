import Api from '../../services/ApiAxios';
export default {
  PATH:{
    
  },
  NAME:{
    Options: 'Options',
    List: 'List',
    Add: 'Add',
    Delete: 'Delete',
  },
  generic({request,...more}){
    console.log('generic:',request,more);
    let _request = {
      type: `${request.path}/${request.name}`,
      url: `/api/v1/${request.path}/${request.name}`,
    };
    if(request.url!=null){
      _request.url = request.url;
    }
    if(request.method=='POST'){
      Api.post(_request,more);
    }
    else if(request.method=='GET'){
      Api.get(_request,more);
    }
    else if(request.method=='UPLOAD'){
      Api.uploadFile(_request,more)
    }
  },
  // resolve({request,...more}){
  //   console.log('generic:',request,more);
  //   let _request = {
  //     type: `${request.path}/${request.name}`,
  //     url: `/api/v1/${request.path}/${request.name}`,
  //   };
  //   if(request.method=='POST'){
  //     var p = new Promise(
  //       function (resolve, reject) {
  //         var r = Api.post(_request,more).then(response=>{
  //           resolve(response);
  //         });
  //         // resolve({a:'1',r:r});
  //         // reject(reason);    
  //     });
  //     return p;
  //   }
  // },
}