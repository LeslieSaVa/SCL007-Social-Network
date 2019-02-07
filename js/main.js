import {checkAuthState, register, exit, google, facebook, login} from  './auth.js'
import {writeUserData,enviarConvalidacionAFirebase, readPost} from './app.js'

 window.onload = () => {

     checkAuthState((firebaseUser) => {
         if (firebaseUser) {
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

 const registerWithEmail = () => {

     const email = textEmail.value;
     const pass = password.value;

     register(email, pass);

 };

 btnSignUp.addEventListener('click', registerWithEmail);

 const loginWithEmail = () => {

     const loginEmail = textEmail.value;
     const loginPass = password.value;
     if (loginEmail != "" && loginPass != "") {
         login(loginEmail, loginPass);
     } else {
         document.getElementById('loginError').innerHTML = "Debes ingresar tu email y password"

     }

 };

 btnLogin.addEventListener('click', loginWithEmail);

 const logOut = () => {

     exit()
 }

 btnLogout.addEventListener('click', logOut);

 const loginGoogle = () => {

     google()
     writeUserData(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName, firebase.auth().currentUser.email,firebase.auth().currentUser.photoURL)

 }

 btnGoogle.addEventListener('click', loginGoogle)

 const loginFacebook = () => {

     facebook()
 }
 btnFacebook.addEventListener('click', loginFacebook)


 const guardarComentarios = () => {
     const name =  firebase.auth().currentUser.displayName;
     const title = tituloaconvalidar.value;
     const coment = coments.value;
     const userId = firebase.auth().currentUser.uid;
     const photo =  fichero.value

     enviarConvalidacionAFirebase(userId, name, title, coment, photo)
     uploadImgtoFirebase()
 }

 btnComents.addEventListener('click', guardarComentarios)


 const readPostFromDatabase = () => {
     readPost((coment) => {
         newcoments.innerHTML +=
             `
             <div class="box text" id="${coment.key}">
                        <div class="box-header">
                          <span>${coment.val().author}<span>
                         </div>
                        <div class="box-content">
                          <div class="content">
                            <h3>${coment.val().body}</h3>
                          </div>
                          <p>${coment.val().title}</p>
                        </div>
                        <div class="box-buttons">
                          <div class="row">
                            <button><span class="fa fa-thumbs-up"></span> Like</button>
                            <button><span class="ion-chatbox-working"></span> Comment</button>
                            <button id="${coment.key}"><span class="ion-chatbox-working"></span>Delete</button>
                          </div>
                        </div>
                      </div> 

       `;//document.getElementById(coment.key).addEventListener('click', deletePost)
     });
 }





const showUserInfo = () => {
    document.getElementById("addpost_container").style.display ="none";
    document.getElementById("index_page").style.display="none";
    document.getElementById("search_container").style.display ="none";
    document.getElementById("profile_container").style.display ="block";
    document.getElementById("recipes_container").style.display ="none";

    const userInfo = firebase.auth().currentUser;
    //console.log(userInfo)
    if(userInfo.photoURL != null){               
        root_profile.innerHTML =`
    <div class="container"><div class="row"><div class="col-12">
    <div class="card card-one">
           <div class="headerCard">
           <div class="avatar"><img src="${userInfo.photoURL}" alt="Jhon Doe"></div>
           </div>
           <h3>${userInfo.displayName}</h3>
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
     </div></div></div>
            `;
           
       }else{
        root_profile.innerHTML =
        `
        <div class="container"><div class="row"><div class="col-12">
        <div class="card card-one">
           <div class="headerCard">
           <div class="avatar"><img src="IMG/avatar-default.png" alt="Jhon Doe"></div>
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
     </div></div></div>`;
    
    }
    }
document.getElementById('showUser').addEventListener('click', showUserInfo);





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
    document.getElementById("search_container").style.display ="none";
    document.getElementById("profile_container").style.display ="none";
    document.getElementById("recipes_container").style.display ="block";

})

