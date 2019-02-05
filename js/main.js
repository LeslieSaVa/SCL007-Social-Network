import {checkAuthState, register, exit, google, facebook, login} from  './auth.js'
import {createComents} from './app.js'

 
window.onload = () =>{
 
    checkAuthState((firebaseUser) => {
        if (firebaseUser){
            loginRegister.style.display ="none";
            contentPage.style.display="block"
            inicializar()
        }else{
           loginRegister.style.display ="block";
           contentPage.style.display="none"
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
    if(loginEmail != "" && loginPass != ""){
        login(loginEmail,loginPass);
    }else{
        document.getElementById('loginError').innerHTML = "Debes ingresar tu email y password"

    }

    

};

btnLogin.addEventListener('click', loginWithEmail);

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


