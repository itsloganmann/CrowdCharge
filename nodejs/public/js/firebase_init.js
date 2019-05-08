// Code snippet from Firebase for setting up web app.
(function(){  
  var config = {
    apiKey: "AIzaSyBXOtHAyVkN2mZraH3sBpBvkCpgdKpmDyI",
    authDomain: "zapshare-1e3ba.firebaseapp.com",
    databaseURL: "https://zapshare-1e3ba.firebaseio.com",
    projectId: "zapshare-1e3ba",
    storageBucket: "zapshare-1e3ba.appspot.com",
    messagingSenderId: "1012195329238"
  };
  firebase.initializeApp(config);

  app_firebase = firebase; 
})();

// Firebase Authentication
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true;
    },
    uiShown: function() {
      $('#firebaseui-auth-container').css({
        "display" : "none",
        "z-index" : "10"
      });
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html',
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: true
    }
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);
