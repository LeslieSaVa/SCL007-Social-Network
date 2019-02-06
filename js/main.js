import {checkAuthState, register, exit, google, facebook, login} from  './auth.js'
import {enviarConvalidacionAFirebase, readPost, deletePost} from './app.js'

 
window.onload = () =>{
 
    checkAuthState((firebaseUser) => {
        if (firebaseUser){

            loginPageContent.style.display ="none";
            headerPage.style.display="block";
            footerPage.style.display="block";
            indexPage.style.display="block";
            readPostFromDatabase();

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


const showUserInfo = () => {
    indexPage.style.display="none";
    const userInfo = firebase.auth().currentUser;
    console.log(userInfo)
    if(userInfo.photoURL != null){
               
    perfilContainer.innerHTML =`
     <div class="card card-one">
           <div class="headerCard">
           <div class="avatar"><img src="${userInfo.photoURL}" alt="Jhon Doe" /></div>
           </div>
           <h3>${userInfo.email}</h3>
           <div class="desc">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
           </div>
           <div class="contacts">
           <a href=""><i class="fa fa-plus"></i></a>
           <a href=""><i class="fa fa-whatsapp"></i></a>
           <a href=""><i class="fa fa-envelope"></i></a>
           <div class="clear"></div>
           </div>
           <div class="footerCard"></div>
     </div>
            `;
           
       }else{
        perfilContainer.innerHTML =
        `
     <div class="card card-one">
           <div class="headerCard">
           <div class="avatar"><img src="IMG/avatar-default.png" alt="Jhon Doe" /></div>
           </div>
           <h3>${userInfo.email}</h3>
           <div class="desc">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
           </div>
           <div class="contacts">
           <a href=""><i class="fa fa-plus"></i></a>
           <a href=""><i class="fa fa-whatsapp"></i></a>
           <a href=""><i class="fa fa-envelope"></i></a>
           <div class="clear"></div>
           </div>
           <div class="footerCard"></div>
     </div>`;
    
    }
    }

showUser.addEventListener('click', showUserInfo);    

