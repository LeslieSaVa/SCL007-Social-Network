import {checkAuthState, register, exit, google, facebook, login} from  './auth.js'
import {enviarConvalidacionAFirebase, readPost,guardandoComentarios, deletePost, biography,likePost, likeCount} from './app.js'

 
window.onload = () =>{
 
    checkAuthState((firebaseUser) => {
        if (firebaseUser){

            login_pagecontent.style.display ='none';
            header_page.style.display='block';
            footer_page.style.display='block';
            index_page.style.display='block';
            readPostFromDatabase();

        }else{
            login_pagecontent.style.display ='block';
            header_page.style.display='none';
            footer_page.style.display='none';
            index_page.style.display='none';
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
    if(loginEmail != '' && loginPass != ''){
        login(loginEmail,loginPass);
    }if (loginEmail != '@' && loginPass !== ''){
        document.getElementById('loginError').innerHTML = 'Debes ingresar un correo electrónico valido.'
    }else{
        document.getElementById('loginError').innerHTML = 'Debes ingresar tu email y password'

    }


};

btnLogin.addEventListener('click', loginWithEmail);

const logOut =() =>{

    exit()
}

btnLogout.addEventListener('click', logOut);

const loginGoogle =()=>{

    google()

}

btnGoogle.addEventListener('click', loginGoogle)

const loginFacebook =()=>{

    facebook()
}
btnFacebook.addEventListener('click', loginFacebook)


 const guardarComentarios = () => {

    

    const name = firebase.auth().currentUser.displayName;
    const title = tituloaconvalidar.value;
    const coment = coments.value;
    let photoUser = firebase.auth().currentUser.photoURL;
    let user_photo= photoUser !== null ? photoUser: 'IMG/avatar-default.png'
    const userId = firebase.auth().currentUser.uid;
    const tags = hashtagsPost.value;
    document.getElementById('coments').value ='';
    document.getElementById('tituloaconvalidar').value='';
    document.getElementById('hashtagsPost').value='';

    let currentDate = new Date()
    let day = currentDate.getDate() 
    let month = currentDate.getMonth().toString()
    let year = currentDate.getFullYear()
    
    
    if ( name == ''){
        alert(` Se deben rellenar todos los campos para poder publicar` )
    }if ( title == ''){
        alert(` Se deben rellenar todos los campos para poder publicar` ) 
    }if ( coment == ''){
        alert(` Se deben rellenar todos los campos para poder publicar` )
    }if ( tags == ''){
        alert(` Se deben rellenar todos los campos para poder publicar` )
    } 
    enviarConvalidacionAFirebase(user_photo,userId, name,title,coment,tags, day , month, year);
    index.click();
 }
 
btnComents.addEventListener('click', guardarComentarios)


const readPostFromDatabase = () => {
   
    root.style.display='block'
    
    readPost((coment)=>{ 
        
        
        newcoments.innerHTML = 
      `          
      <div class='row' id= ${coment.key}>  
          <div class='col-3 col-m-2 col-s-12'></div>
          <div class='col-6 col-m-8 col-s-12'>  
                    <div class='box_text'>
                        <div class='box-header'>
                         <div class='avatar_post'><img src='${coment.val().profile_picture}'/></div> 
                          <div class='name-post'>${coment.val().author}</div>
                        </div>
                        <div class='box-content'>
                        <h3>${coment.val().title}</h3><br>
                        
                          <div class='content'>                          
                            <p>${coment.val().body}</p>
                          </div><br>
                          <h4>${coment.val().hashtag}</h4><br>
                          <span> Creado: ${coment.val().date.d} / ${coment.val().date.m} / ${coment.val().date.y} </span>
                        </div>
                        <div class='box-buttons'>
                       <div class='row'>
                        <div class='col-4'>
                            <button class='btn-likecoment likes' id='likePost${coment.key}'><span class='fa fa-thumbs-up'></span>  <span id= 'countLike${coment.key}'></span> Like </button></div>
                            <div class='col-4'>
                            <button  class='btn-likecoment comments_home'id='${coment.key}'><span class='icondeskopt'><i class="far fa-comment"></i></span><p class='iconmovile'>Ver comentarios</p></button></div>
                            <div class='col-4'>
                            <button  id="btn${coment.key}" userpp=${coment.key} class='btn-likecoment borrar'><span class='icondeskopt'><i class='far fa-trash-alt'></i></span><p class='iconmovile'>borrar</p></button></div>   
                               </div>
                               <div id='comentPost'>               
                                 
                               
                               <textarea class='coments-post' name='comentario' id='comentsPostHome${coment.key}'
                                   placeholder='Escribe aqui tu comentario...'></textarea>           
                               <button  class='btn-likecoment save_homecoment' id='${coment.key}'>Comentar</button>
                      
              
                       </div> <br>
                       <div  id='printHome${coment.key}'> </div>
                        </div>
                 </div> 
            </div>
        <div class='col-3 col-m-2 col-s-12'></div>
         </div>` + newcoments.innerHTML;  
        //document.getElementById("btn"+ coment.key).addEventListener('click',deletePost);
        //  document.getElementById(`likePost${coment.key}`).addEventListener('click', btnLikePost)
        let btnLikes = document.getElementsByClassName('likes');
        for (let i =0; i< btnLikes.length; i++){
            btnLikes[i].addEventListener('click', btnLikePost);
        }
        let btnBorrar = document.getElementsByClassName('borrar');
        for (let i =0; i< btnBorrar.length; i++){
            btnBorrar[i].addEventListener('click', deletePost);
        }
        let btnComentarioHome = document.getElementsByClassName('comments_home');
        for (let i =0; i< btnComentarioHome.length; i++){
            btnComentarioHome[i].addEventListener('click', readComentsHome);
        }
        let btnSaveComentHome = document.getElementsByClassName('save_homecoment');
        for (let i =0; i< btnSaveComentHome.length; i++){
            btnSaveComentHome[i].addEventListener('click', saveComentHome);
        }
                      
       if ( coment.val().hashtag == '#receta' || coment.val().hashtag == '#recetas' || coment.val().hashtag == '#recetasaludable' || coment.val().hashtag == '#RECETA' || coment.val().hashtag == '#RECETAS' ) {
          
        recipes_post.innerHTML =  `
          
        <div class='row' id= ${coment.key}>  
            <div class='col-3 col-m-2 col-s-12'></div>
            <div class='col-6 col-m-8 col-s-12'>  
                      <div class='box_text'>
                          <div class='box-header'>
                           <div class='avatar_post'><img src='${coment.val().profile_picture}'/></div> 
                            <div class='name-post'>${coment.val().author}</div>
                          </div>
                          <div class='box-content'>
                          <h3>${coment.val().title}</h3><br>
                            <div class='content'>                            
                              <p>${coment.val().body}</p><br>
                            </div>
                            <h4>${coment.val().hashtag}</h4><br>
                            <span> Creado:${coment.val().date.d} / ${coment.val().date.m} / ${coment.val().date.y} </span>
                          </div>
                          <div class='box-buttons'>
                         <div class='row'>
                          <div class='col-4'>
                              <button class='btn-likecoment likes' id='likPosRe${coment.key}'><span class='fa fa-thumbs-up'></span> <span id='countLikeRec${coment.key}'></span> Like </button></div>

                           <div class='col-4'>
                              <button  class='btn-likecoment comments' id='${coment.key}'><span class='ion-chatbox-working'></span>Ver Comentarios</button>
                            </div>
                               
                          <div class='col-4'>
                                <button  id="btn${coment.key}" userpp=${coment.key} class='btn-likecoment borrar'><span class='icondeskopt'><i class='far fa-trash-alt'></i></span><p class='iconmovile'>borrar</p></button>
                            </div>   
                                 
                            </div>
                                 <div id='comentPost${coment.key}'>                         
                                 
                               
                                         <textarea name='comentario' id='comentsPostRece${coment.key}' style='width: 100%; /*! height: 85px; */'
                                             placeholder='Escribe aqui tu comentario...'></textarea>           
                                         <button  class='btn-likecoment save_coment' id='${coment.key}'>Comentar</button>
                                
                        
                                 </div> <br>
                                 <div class="comentarPost" id='print${coment.key}'></div>
                          </div>
                   </div>     
              </div>
          <div class='col-3 col-m-2 col-s-12'></div>
           </div>` + recipes_post.innerHTML; 
           let btnLikes = document.getElementsByClassName('likes');
           for (let i =0; i< btnLikes.length; i++){
               btnLikes[i].addEventListener('click', btnLikePost);
           }
           let btnBorrar = document.getElementsByClassName('borrar');
           for (let i =0; i< btnBorrar.length; i++){
               btnBorrar[i].addEventListener('click', deletePost);
           }
           let btnComentario = document.getElementsByClassName('comments');
            for (let i =0; i< btnComentario.length; i++){
                btnComentario[i].addEventListener('click', readComents );
           }
            let btnSaveComent = document.getElementsByClassName('save_coment');
            for (let i =0; i< btnSaveComent.length; i++){
                btnSaveComent[i].addEventListener('click', saveComent);
           }
          
            }
        })
    };     
  

const btnLikePost = (e) =>{
    const key = e.currentTarget.getAttribute('id').slice(8) 
    //const key = keyA !== null ? keyA :e.currentTarget.getAttribute('id').slice(11)
    const uid = firebase.auth().currentUser.uid;
    console.log(key)
    likePost (key,uid)
    printLikes (key,uid)
    likeCount (key,uid)

} 

const printLikes =(key, uid) =>{

    let thisPostRef = firebase.database().ref('posts/'+ key + '/starCount'+ '/likeCount');
    thisPostRef.once('value', function(snapshot) {
    let printLikeCount = snapshot.val() ? Object.entries(snapshot.val()): 0;
    const likeFinal = printLikeCount.length ? printLikeCount.length : 0;
            console.log(likeFinal)
        if ( snapshot.val() ) {
            document.getElementById(`countLike${key}`).innerHTML = `${ likeFinal }`
            document.getElementById(`countLikeRec${key}`).innerHTML = `${ likeFinal}`;
            if(document.getElementById(`countLikeRec${key}`) === null){
                return
            }else{
                document.getElementById(`countLikeRec${key}`).innerHTML = `${ likeFinal }`;
            }

        } else {
           console.log( uid + '- no data in Firebase' );
            return 0;
        }
    });

}

const readComentsHome = (e) => {       
    
    const keyHome = e.currentTarget.getAttribute('id')    
    const comentRefHome = firebase.database().ref('/posts/' + keyHome + '/coment/');
    
    comentRefHome.once('value', (snapshot) => {

        if(snapshot.val() === null || snapshot.val() == '' ){
               
            alert ('No existen comentarios para ésta publicación') 

       }else{

           for (let snap in snapshot.val()) {                

             document.getElementById(`printHome${keyHome}` ).innerHTML = `            
                    <div class="comentar-post" id= ${keyHome}>
                    <h3>${snapshot.val()[snap].author}</h3>
                    <p>${snapshot.val()[snap].contenido}<p> 
                    </div>
             ` + document.getElementById(`printHome${keyHome}`).innerHTML;
               }}
           })
       
   }

   const readComents = (e) => {  
       
    const keyRecipes = e.currentTarget.getAttribute('id') 
    const comentRefRecipes = firebase.database().ref('/posts/' + keyRecipes + '/coment/'); 

    comentRefRecipes.once('value', (snapshot) => {         

            if(snapshot.val() === null || snapshot.val() == '' ){
               
                alert ('No existen comentarios para ésta publicación') 

           }else{
               for (let snap in snapshot.val()) {  
                
                 document.getElementById(`print${keyRecipes}`).innerHTML = `            
                        <div id= ${keyRecipes}  style='border: 1px solid purple'>
                        <p>${snapshot.val()[snap].author}</p>
                        <h3>${snapshot.val()[snap].contenido}<h3> 
                        </div>
                 ` + document.getElementById(`print${keyRecipes}`).innerHTML;
                   }}
               })
            
   }


   const saveComentHome =(e) =>{
    const key = e.currentTarget.getAttribute('id')
    const name=firebase.auth().currentUser.displayName;     
    const contenido = document.getElementById(`comentsPostHome${key}`).value;

    if (contenido === null || contenido === ""){

        alert ('Debe completar todos los campos para comentar')
    }else{
    guardandoComentarios(key,contenido,name);
    printCommentHome(key,contenido,name);
    }
}

const saveComent =(e) =>{
    const key = e.currentTarget.getAttribute('id')
    const name=firebase.auth().currentUser.displayName; 
    const contenido = document.getElementById(`comentsPostRece${key}`).value;

    if (contenido === null || contenido === ""){

        alert ('Debe completar todos los campos para comentar')
    }else{
      
    guardandoComentarios(key,contenido,name);
    printComment(key,contenido,name);

    }
}

const printCommentHome = (key,contenido,name) => {     
    const nombre = name !== null ? name : firebase.auth().currentUser.email;

    document.getElementById("printHome" + key).innerHTML =""
    document.getElementById("printHome" + key).innerHTML = `
    <div id= ${key} style='border: 1px solid purple'>
        <p>${nombre}</p>
        <h3>${contenido}<h3> 
    </div> `
    + document.getElementById("printHome"+ key).innerHTML;
}

const printComment = (key,contenido,name) => {     
    const nombre = name !== null ? name : firebase.auth().currentUser.email;
    document.getElementById("print" + key).innerHTML = ""
    document.getElementById("print" + key).innerHTML = `
    <div id= ${key} style='border: 1px solid purple'>
        <p>${nombre}</p>
        <h3>${contenido}<h3> 
    </div>`
    + document.getElementById("print" + key).innerHTML;
}


const showUserInfo = () => {
    index_page.style.display='none';
    recipes_container.style.display ='none';
    profile_container.style.display ='block';
    search_container.style.display ='none';
    addpost_container.style.display ='none';

    const userInfo = firebase.auth().currentUser;
    let photoUser = firebase.auth().currentUser.photoURL;
    let user_photo= photoUser !== null ? photoUser: 'IMG/avatar-default.png'
   
    //console.log(userInfo)
    // if(userInfo.photoURL != null){
           
    profile_container.innerHTML =`
    <div class='container'>
    <div class='row'>
    <div class='col-4 col-m-2'></div>
    <div class='col-4 col-m-8 col-s-12'>
    <div class='card card-one'>
           <div class='header_card'>
           <div class='avatar'><img src='${user_photo}' alt='Jhon Doe' /></div>
           </div>
           <p class='info-user-p'>${userInfo.email}</p>
           <div class='desc' id='biography${userInfo.uid}'>
           <textarea name='comentario' id='postBio${userInfo.uid}' style='width: 100%; /*! height: 85px; */'
           placeholder='Escribe aqui tu comentario...'></textarea>           
          <button id='btnSaveBiography${userInfo.uid}'> Guardar Biografía </button>
           </div>
           
           <div class='footer_card'>
           <button id='btn-logout' class='btn-likecoment'>Cerrar Sesión</button>
           </div>
     </div>
     </div>
     <div class='col-4 col-m-2'></div>
     </div>
     </div>
            `; document.getElementById('btn-logout').addEventListener('click', logOut)
               document.getElementById(`btnSaveBiography${userInfo.uid}`).addEventListener('click', saveBiography)
    }     
    

    const saveBiography = (e) =>{

    const key = e.target.getAttribute('id').slice(16)
    console.log (key)
    const contenido = document.getElementById(`postBio${key}`).value

        document.getElementById(`biography${key}`).innerHTML = `
        
        <p> ${contenido}</p>
        `;
        biography(key,contenido)
    }
    
    showUser.addEventListener('click', showUserInfo);    

    document.getElementById('addPost').addEventListener('click', () =>{
    
        document.getElementById('addpost_container').style.display ='block';
        document.getElementById('index_page').style.display='none';
        document.getElementById('search_container').style.display ='none';
        document.getElementById('profile_container').style.display ='none';
        document.getElementById('recipes_container').style.display ='none';
    
    })
    
    document.getElementById('addPostDesktop').addEventListener('click', () =>{
    
        document.getElementById('addpost_container').style.display ='block';
        document.getElementById('index_page').style.display='none';
        document.getElementById('search_container').style.display ='none';
        document.getElementById('profile_container').style.display ='none';
        document.getElementById('recipes_container').style.display ='none';
    
    })
    
    
    document.getElementById('index').addEventListener('click', () =>{
    
        document.getElementById('addpost_container').style.display ='none';
        document.getElementById('index_page').style.display='block';
        document.getElementById('search_container').style.display ='none';
        document.getElementById('profile_container').style.display ='none';
        document.getElementById('recipes_container').style.display ='none';
    
    })
    document.getElementById('indexDesktop').addEventListener('click', () =>{
    
        document.getElementById('addpost_container').style.display ='none';
        document.getElementById('index_page').style.display='block';
        document.getElementById('search_container').style.display ='none';
        document.getElementById('profile_container').style.display ='none';
        document.getElementById('recipes_container').style.display ='none';
    
    })
    
    document.getElementById('search').addEventListener('click', () =>{
    
        document.getElementById('addpost_container').style.display ='none';
        document.getElementById('index_page').style.display='none';
        document.getElementById('search_container').style.display ='block';
        document.getElementById('profile_container').style.display ='none';
        document.getElementById('recipes_container').style.display ='none';
    
    })
    
    document.getElementById('searchDesktop').addEventListener('click', () =>{
    
        document.getElementById('addpost_container').style.display ='none';
        document.getElementById('index_page').style.display='none';
        document.getElementById('search_container').style.display ='block';
        document.getElementById('profile_container').style.display ='none';
        document.getElementById('recipes_container').style.display ='none';
    
    })
    
    document.getElementById('recipes').addEventListener('click', () =>{
    
        document.getElementById('addpost_container').style.display ='none';
        document.getElementById('index_page').style.display='none';
        document.getElementById('search_container').style.display ='block';
        document.getElementById('profile_container').style.display ='none';
        document.getElementById('recipes_container').style.display ='block';
    
    })
    document.getElementById('recipesDesktop').addEventListener('click', () =>{
    
        document.getElementById('addpost_container').style.display ='none';
        document.getElementById('index_page').style.display='none';
        document.getElementById('search_container').style.display ='block';
        document.getElementById('profile_container').style.display ='none';
        document.getElementById('recipes_container').style.display ='block';
    
    })
    

// active buttons footer

let btns = document.getElementsByClassName('btn-act');
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
  let current = document.getElementsByClassName('active');
  current[0].className = current[0].className.replace(' active', '');
  this.className += ' active';
  });
}



// //upload image in post
// const inputLoader = document.getElementById('postImgInput');

// inputLoader.addEventListener('change', (e) => {
//   const file = e.target.files[0];
//   const storageRef = firebase.storage().ref('images/' + file.name);
//   const uploadTask = storageRef.put(file);
//   uploadTask.on('state_changed', function (snapshot) {
//   },
//     function error(err) {
//     },

//     function complete() {
//       storageRef.getDownloadURL().then(function (url) {
//     console.log
    
//       });
//     });
// });
