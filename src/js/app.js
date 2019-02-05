
export const writeUserData =(uid, name, email, imageUrl)=> {
    firebase.database().ref('users/'+ uid).set({
      'perfil':{
      username: name !== null ? name : firebase.auth().currentUser.email,
      email: email,
      profile_picture : imageUrl !== null ? imageUrl : false,
      }
    });
  }


