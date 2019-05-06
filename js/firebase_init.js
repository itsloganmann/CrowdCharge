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

var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      $('#firebaseui-auth-container').css({
        "display" : "none",
        "position" : "fixed",
        "left" : "0",
        "right" : "0",
        "z-index" : "2"
      });
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [{
    // Leave the lines as is for the providers you want to offer your users.
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: true
    }
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);
