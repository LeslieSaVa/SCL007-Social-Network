import {checkAuthState, register, exit, google, facebook} from  './auth.js'
   
window.onload = () =>{
 
    checkAuthState((firebaseUser) => {
        if (firebaseUser){
            loginRegister.style.display ="none";

        }else{
           loginRegister.style.display ="block";
        }
    });

}

const registerWithEmail =()=>{

    const email = textEmail.value;
    const pass = password.value;

    register(email,pass);

};

btnSignUp.addEventListener('click', registerWithEmail);

const loginWithEmail =()=>{

    const loginEmail = textEmail.value;
    const loginPass = password.value;

    register(loginEmail,loginPass);

};

btnLogin.addEventListener('click', registerWithEmail);

const LogOut =() =>{

    exit()
}

btnLogout.addEventListener('click', exit);

const loginGoogle =()=>{

    google()

}

btnGoogle.addEventListener('click', google)

const loginFacebook =()=>{

    facebook()
}
btnFacebook.addEventListener('click', facebook)