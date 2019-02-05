import {checkAuthState, register, exit, google, facebook, login} from  './auth.js'

 
window.onload = () =>{
 
    checkAuthState((firebaseUser) => {
        if (firebaseUser){
            loginPageContent.style.display ="none";
            headerPage.style.display="block";
            footerPage.style.display="block";
            indexPage.style.display="block";
          
        }else{
            loginPageContent.style.display ="block";
            headerPage.style.display="none";
            footerPage.style.display="none";
            indexPage.style.display="none";
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

const showUserInfo = () => {
    indexPage.style.display="none";
    const userInfo = firebase.auth().currentUser;
    console.log(userInfo)
    if(userInfo.photoURL != null){
               
    perfilContainer.innerHTML =`<h3>${userInfo.email}</h3>
            <img src="${userInfo.photoURL}" style="width:300px"/>`;
           
       }else{
        perfilContainer.innerHTML =`<h3>${userInfo.email}</h3>
         <img src="IMG/avatar-default.png" style="width:300px"/>`;
    }
    }

showUser.addEventListener('click', showUserInfo);    