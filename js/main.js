import {checkAuthState, register, exit, google, facebook, login} from  './auth.js'
import {enviarConvalidacionAFirebase, readPost, deletePost} from './app.js'

 
window.onload = () =>{
 
    checkAuthState((firebaseUser) => {
        if (firebaseUser){

            login_pagecontent.style.display ="none";
            header_page.style.display="block";
            footer_page.style.display="block";
            index_page.style.display="block";
            readPostFromDatabase();

        }else{
            login_pagecontent.style.display ="block";
            header_page.style.display="none";
            footer_page.style.display="none";
            index_page.style.display="none";
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
    index_page.style.display="none";
    recipes_container.style.display ="none";
    profile_container.style.display ="block";
    search_container.style.display ="none";
    addpost_container.style.display ="none";

    const userInfo = firebase.auth().currentUser;
     console.log(userInfo)   
    //console.log(userInfo)
    if(userInfo.photoURL != null){
           
    profile_container.innerHTML =`
    <div class="container">
    <div class="row">
    <div class="col-4 col-m-2"></div>
    <div class="col-4 col-m-8 col-s-12">
    <div class="card card-one">
           <div class="header_card">
           <div class="avatar"><img src="${userInfo.photoURL}" alt="Jhon Doe" /></div>
           </div>
           <p class="info-user-p">${userInfo.email}</p>
           <div class="desc">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit et cupiditate deleniti.
           </div>
           <div class="contacts">
           <a href=""><i class="fa fa-plus"></i></a>
           <a href=""><i class="fa fa-whatsapp"></i></a>
           <a href=""><i class="fa fa-envelope"></i></a>
           <div class="clear"></div>
           </div>
           <div class="footer_card"></div>
     </div>
     </div>
     <div class="col-4 col-m-2"></div>
     </div>
     </div>
            `;
           
       }else{
        profile_container.innerHTML =
        `
        <div class="container"><div class="row"><div class="col-12">
        <div class="card card-one">
           <div class="header_card">
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
           <div class="footer_card"></div>
     </div>
     </div></div></div>`;
    
    }
    }

showUser.addEventListener('click', showUserInfo);    

document.getElementById("addPost").addEventListener('click', () =>{

    document.getElementById("addpost_container").style.display ="block";
    document.getElementById("index_page").style.display="none";
    document.getElementById("search_container").style.display ="none";
    document.getElementById("profile_container").style.display ="none";
    document.getElementById("recipes_container").style.display ="none";

})


document.getElementById("index").addEventListener('click', () =>{

    document.getElementById("addpost_container").style.display ="none";
    document.getElementById("index_page").style.display="block";
    document.getElementById("search_container").style.display ="none";
    document.getElementById("profile_container").style.display ="none";
    document.getElementById("recipes_container").style.display ="none";

})

document.getElementById("search").addEventListener('click', () =>{

    document.getElementById("addpost_container").style.display ="none";
    document.getElementById("index_page").style.display="none";
    document.getElementById("search_container").style.display ="block";
    document.getElementById("profile_container").style.display ="none";
    document.getElementById("recipes_container").style.display ="none";

})


document.getElementById("recipes").addEventListener('click', () =>{

    document.getElementById("addpost_container").style.display ="none";
    document.getElementById("index_page").style.display="none";
    document.getElementById("search_container").style.display ="block";
    document.getElementById("profile_container").style.display ="none";
    document.getElementById("recipes_container").style.display ="block";

})

// active buttons footer
let header = document.getElementById("icon-active-footer");
let btns = header.getElementsByClassName("btn-act");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  let current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}