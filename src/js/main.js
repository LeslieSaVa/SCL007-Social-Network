import {checkAuthState, register, exit, google, facebook, login} from  './auth.js'
import {enviarConvalidacionAFirebase, readPost, deletePost} from './app.js'

 
window.onload = () =>{
 
    checkAuthState((firebaseUser) => {
        if (firebaseUser){
            loginRegister.style.display ="none";
            contentPage.style.display="block"
            readPostFromDatabase();
            
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

const showcoments =()=>{

    
}

 const guardarComentarios = () => {

    const name = nombreaconvalidar.value;
    const title = tituloaconvalidar.value;
    const coment = coments.value;
    const userId = firebase.auth().currentUser.uid;

    enviarConvalidacionAFirebase(userId, name, title,coment)


 }
btnComents.addEventListener('click', guardarComentarios)


const readPostFromDatabase = () => {
    root.style.display="block"
    readPost((coment)=>{            
        newcoments.innerHTML  += 
      `<div id= ${coment.key}>
      <h3>${coment.val().title}</h3>
       <p>${coment.val().body}</p>
       <button id=" ${coment.key}">borrar</button>
       </div>
       `;  document.getElementById(coment.key).addEventListener('click', deletePost)
    });     
  }


  
 
  

