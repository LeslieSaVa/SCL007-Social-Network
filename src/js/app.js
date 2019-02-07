export const writeUserData = (uid, name, email, imageUrl) => {
  firebase.database().ref('users/'+uid).set({
    "perfil": {
      username: name !== null ? name : firebase.auth().currentUser.email,
      email: email,
      profile_picture: imageUrl !== null ? imageUrl : false,
    }
      
  });
}

export const enviarConvalidacionAFirebase =(uid, username,title, body,imagen)=>{
  // Crear nuevo post
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    imagen: imagen !== null ? imagen : false,
    
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
  var postRef = firebase.database().ref('posts');
  postRef.once('child_added',(coment)=> {
    onpostChange(coment);
  });
};

/*
export function deletePost(){ 
  firebase.database().ref('posts/'+ this.id).set({
    null:null
  })
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid+ '/post/'+ this.id).set({
    null:null
  })
};
*/






export const mostrarImgFirebase=(imgChange)=>{
  imagenRef = firebase.database().ref('posts');
  imagenRef.on("value", function(snapshot){
     imgChange(snapshot)
  });
}

export const uploadImgtoFirebase=()=>{
  const imagenASubir = fichero.files[0];
  const uploadTask = firebase.storage().ref().child('imagenes/' + imagenASubir.name).put(imagenASubir);
  uploadTask.on('state_changed', 
  function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
      alert("hubo un error");
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      crearNodoEnBDFirebase(imagenASubir.name, downloadURL);
    });
  });
}

export const crearNodoEnBDFirebase=(nombreImagen, downloadURL)=>{
  imagenesRef.push({nombre: nombreImagen, url: downloadURL});
}






