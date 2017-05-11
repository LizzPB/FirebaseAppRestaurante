(function() {
   // Initialize Firebase
  const config = {
    apiKey: "AIzaSyB7dw49nHdAJcYFWVI-vFLrt_kf2_xBl0w",
    authDomain: "restaurante-522b9.firebaseapp.com",
    databaseURL: "https://restaurante-522b9.firebaseio.com",
    projectId: "restaurante-522b9",
    storageBucket: "restaurante-522b9.appspot.com",
    messagingSenderId: "136888241015"
  };
  firebase.initializeApp(config);
  // body... 
  // Get a reference to the database service
  const databaseRef = firebase.database().ref('comments');
  //Get elements by ID
  const nameInput = document.getElementById("name");
  const commentsInput = document.getElementById("comment");
  const btnSignUp = document.getElementById("btnLogin");
  const btnSignOut = document.getElementById("btnLogout");
  const form = document.querySelector("form");

  //EVENTS
  btnSignUp.addEventListener('click', e =>{    
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider).then((result) =>{
      // The firebase.User instance:
      var user = result.user.displayName;
      var email = result.user.email;
      var photo = result.user.photoURL;
      // The Google credential, this contain the Google access token:
      var credential = result.credential;
      console.log(`${result.user.email} ha iniciado sesion`);
      console.log(`${result.user.displayName} ha iniciado sesion`);
      firebase.database().ref('users/' + user).update({
        username: user,
        email: email,
        foto: photo
      })
      nameInput.value=user;
      nameInput.setAttribute("disabled", "disabled")
    })
      .catch(error => console.error(`Error : ${error.code}: ${error.message}`))
  })

  btnSignOut.addEventListener('click', e =>{   
    firebase.auth().signOut()
      .then(() =>{
      console.log('te has deslogeado')
      location.reload();
    })
      .catch(error => console.error(`Error : ${error.code}: ${error.message}`))
  })

  firebase.auth().onAuthStateChanged(user => {
  })

  form.addEventListener("submit", postComment);

  //Anonimus function timeStamp, par aagregar fecha y hora al comentario
  const timeStamp = () => {
  let options = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute:'2-digit'
  };
  let now = new Date().toLocaleString('es-MX', options);
  return now;
  };


  function postComment(e) {
  e.preventDefault();
  //obtiene los valores de los elementos con el id name y comment.
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;
  //Si las variables name y comment son diferente de nulas
  if (name && comment) {
    databaseRef.push({
      name: name,
      comment: comment,
      time: timeStamp()
    });
  }

  document.getElementById("name").value = '';
  document.getElementById("comment").value = '';
  };

  databaseRef.on("child_added", snapshot => {
  let comment = snapshot.val();
  addComment(comment.name, comment.comment, comment.time);
  });

  const addComment = (name, comment, timeStamp) => {
  let comments = document.getElementById("comments");
  comments.innerHTML = `<hr> <span class='right'>${timeStamp}</span> <h6 id="nameUser">${name}</h6> <p id="comentarioUser">${comment}</p>${comments.innerHTML}`;
  }

}());
 