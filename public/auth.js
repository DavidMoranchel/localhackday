// auth

var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('email');
provider.addScope('user_birthday');
provider.setCustomParameters({
  'display': 'popup'
});

var authFB = () => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


var signOutFB = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#signIN').hide()
    $('#signOut').show();
    $('#cont-photo').show();
    $('#photoUser').attr('src',user.photoURL);
    $('#username').html(user.displayName);
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(user,'user');
    // ...
  } else {
    // User is signed out.
    // ...
    $('#signIN').show();
    $('#signOut').hide();
    $('#cont-photo').hide();
  }
});
