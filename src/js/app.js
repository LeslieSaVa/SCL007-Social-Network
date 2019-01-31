  /*

//  Elementos del Dom

const txtEmail= document.getElementById('email');
const txtPass=document.getElementById('password');
const btnLogin=document.getElementById('btnLogin');
const btnSignUp=document.getElementById('btnSignUp');
const btnLogOut =document.getElementById('btnLogout');
const btnFacebook =document.getElementById('btnFacebook');
const btnGoogle=document.getElementById('btnGoogle');


// Evento LogIn
btnLogin.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPass.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e =>console.log(e.message))
});

// Evento SignUp

btnSignUp.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPass.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e =>console.log(e.message))
});

btnLogOut.addEventListener('click', e =>{
    firebase.auth().signOut();
});




// Facebook

btnFacebook.addEventListener('click', () =>{
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider);    
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user)
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
      });
    


//Google
btnGoogle.addEventListener('click', () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(result.user.uid)
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



})

*/