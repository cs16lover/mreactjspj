import createHistory from "history/createHashHistory";
const G = {
  history: createHistory(),
  goToHome: function () {
    window.location.href = '/';
  },
  goToPath: function ({history,path}) {
    console.log('goToPath:',history,path);
    if(history && history.push){
      history.push(path);
    }
    else if(G.history){
      G.history.push(path);
    }
  },
  goToUrl({url,target='_blank'}){
    window.open(url,target);
  },
}

export default G;