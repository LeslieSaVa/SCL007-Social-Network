export const writeUserData = (uid, name, email, imageUrl) => {

  firebase.database().ref("users/"+uid).once("value", function(snapshot) {
    if (snapshot.val() === null) {
      firebase.database().ref('users/'+uid).set({
            "perfil": {
              username: name !== null ? name : firebase.auth().currentUser.email,
              email: email,
              profile_picture: imageUrl !== null ? imageUrl : false,
            },
        })
    }
         
  });
}

export const enviarConvalidacionAFirebase =(imageUrl,uid,username,title,body,postTag)=>{
  // Crear nuevo post
  const postData = {
    profile_picture: imageUrl,
    author: username !== null ? username : firebase.auth().currentUser.email,
    uid: uid,
    body: body,
    title: title,
    hashtag: postTag,
    
  };

  // Llave que identifica el nuevo post
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Ingresa el post en publico y en su perfil.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/users/' + uid + '/post/' + newPostKey] = postData;
  return firebase.database().ref().update(updates);
}

export const readPost = (onpostChange) => {
  let postRef = firebase.database().ref('posts');
  postRef.on('child_added',(coment)=> {
    
    onpostChange(coment);
  });
};

export const deletePost = (postdelete) => {
  var postID = postdelete.currentTarget.getAttribute("userpp");  
  var firebaseref = firebase.database().ref('posts/'+ postID);
  let askRemove = confirm("Quieres eliminar este Post?")
  if(askRemove == true){
    firebaseref.remove();
    location.reload();
  }else{
    return null
  }
}

export const guardandoComentarios =(key, contenido, author)=>{
  // Crear nuevo post
  const postcoment = {
    author: author !== null ? author : firebase.auth().currentUser.email,
    contenido: contenido,
    
  }; 

  // Llave que identifica el nuevo post
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Ingresa el post en publico y en su perfil.
  var updates = {};
  updates['/posts/' + key + '/coment/' + newPostKey] = postcoment;
 // updates['/users/' + uid + '/post/' + key + '/comment/' + newPostKey] = postcoment;

 
  return firebase.database().ref().update(updates);
}

export const biography = (uid,contenido)=>{

 firebase.database().ref('users/'+uid).update({
            biografía: contenido            
            
        })
    }
         

    export const likePost = (id, uid) => { 

      let postRef = firebase.database().ref('posts/'+ id + '/starCount');
      // get current number of likes here, so we can increment if any exist
      postRef.child('like-count').once('value', function(snapshot){
          let currentLikes = snapshot.val() ? snapshot.val() : 0;
          postRef.update({
             
              'postID': uid,
              'likeCount': currentLikes + 1,
                        
              }, function(error) {
                if (error) {
                  console.log('Data could not be saved:' + error);

                } else {
                  console.log('Data saved successfully');

                }

              });

          //getLikeCount(id);

      });

  } 