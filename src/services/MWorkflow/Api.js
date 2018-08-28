import * as H from '../../helpers';
const Api = {
  collection: 'wf_rCya7bt2oMd3b8qoLH866K8nIOy2',
  getAll(){
    H.F.FireStore.get({
      collection: Api.collection,
    })
  },
  add({pID}={}){
    H.F.FireStore.add({
      collection: Api.collection,
      value:{
        content: '',
        pID: pID!=null?pID:null,
      }
    })
  },
  remove(){
    
  },
  update({ID,value}){

  },
}
export default Api;