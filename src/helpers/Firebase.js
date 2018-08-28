import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import "firebase/auth";

const FHelper = {
  firebase: null,
  initWithConfig(config){
    if(FHelper.firebase==null){
      FHelper.firebase = firebase.initializeApp(config);
      const settings = {/* your settings... */ timestampsInSnapshots: true};

      console.log('initWithConfig:',config,FHelper);

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('onAuthStateChanged:',user);
          // User is signed in.
          // var displayName = user.displayName;
          // var email = user.email;
          // var emailVerified = user.emailVerified;
          // var photoURL = user.photoURL;
          // var isAnonymous = user.isAnonymous;
          // var uid = user.uid;
          // var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });
    }
  },
  Auth:{
    loginWithGoogle({scb,fcb}){
      if(FHelper.firebase!=null){
        var _provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(_provider)
        .then(function(result) {
          // var token = result.credential.accessToken;// var user = result.user;// console.log(token, user);
          console.log(result);
          if(scb!=null){scb({result})}
        })
        .catch(function(error) {
          // var errorCode = error.code;// var errorMessage = error.message;// var email = error.email;// var credential = error.credential;
          console.log(error);
          if(fcb!=null){fcb({error})}
        });
      }else{console.warn('firebase not init yet!')}
    },
    loginWithFacebook({scb,fcb}){
      if(FHelper.firebase!=null){
        var _provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
        .signInWithPopup(_provider)
        .then(function(result) {
          // var token = result.credential.accessToken;// var user = result.user;// console.log(token, user);
          console.log(result);
          if(scb!=null){scb({result})}
        })
        .catch(function(error) {
          // var errorCode = error.code;// var errorMessage = error.message;// var email = error.email;// var credential = error.credential;
          console.log(error);
          if(fcb!=null){fcb({error})}
        });
      }else{console.warn('firebase not init yet!')}
    },
  },
  FireStore:{
    get({collection}){
      var db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};db.settings(settings);
      return db.collection(collection).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => `,doc.data());
        });
      });
    },
    add({collection,document,value}){
      var db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};db.settings(settings);
      return db.collection(collection).add(value)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    },
    update({collection,document,value}){
      var db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};db.settings(settings);
      return db.collection(collection).document(document).update(value)
      .then(function(docRef) {
        console.log("Document successfully updated!",docRef);
      })
      .catch(function(error) {
        console.error("Document fail updated!", error);
      });
    },
  },
  // logError(obj){
  //   try {
  //     var _d = new Date();
  //     let _currentDate = _d.toJSON().slice(0,10).replace(/-/g,'_');
  //     let _currentHour = _d.toJSON().slice(11,19).replace(/:/g,'_')+'__'+_d.getTime();
  //     let _path = 'log/errors/' + _currentDate + '/' + _currentHour;
  //     F.database().ref(_path).set({
  //       data: obj,
  //       url: window.location.href,
  //       user:{
  //         name: Auth.getName(),
  //       }
  //     });
  //   } catch (error) {
  //     console.warn('FHelper logError error:',obj);
  //   }
  // },
  // logToken(email,token){
  //   try {
  //     let _path = 'log/tokens/' + email;
  //     F.database().ref(_path).set({
  //       data: Math.random().toString(36).substr(2, 5) + token,
  //       time: new Date().toISOString(),
  //       name: Auth.getName(),
  //     });
  //   } catch (error) {
  //     console.warn('FHelper logError error:',obj);
  //   }
  // },
}

// export {
//   F,
//   FHelper,
// }



export default FHelper;