var config = {
  apiKey: "AIzaSyAMFsJnzyX6WiujcfrLwA5wQHB8XB9j97Q",
  authDomain: "localhd-72222.firebaseapp.com",
  databaseURL: "https://localhd-72222.firebaseio.com",
  projectId: "localhd-72222",
  storageBucket: "localhd-72222.appspot.com",
  messagingSenderId: "1066454826663"
};
firebase.initializeApp(config);

const database = firebase.database();
const refProyects = database.ref('proyects');

database.ref('curso').set({
  despedida:'adios'
})


//list proyect
refProyects.on('child_added', (data) => {
  console.log(data.key,data.val());
  createProyectDiv(data.key, data.val());
});

refProyects.on('child_changed', (data) => {
  $('#'+data.key+'>p>span.qualificationProyect').html(data.val().qualification);
});

refProyects.on('child_removed', (data) => {
  $('#'+data.key).remove();
});

const createProyectDiv = (key, data) => {
  let div = '<div class="container_proyect">'+
              '<div id="'+key+'" class="proyect">'+
                '<p> ID: <span class="idProyect">'+key+'</span></p><br>'+
                '<p>Titulo: <span class="idTitle">'+data.title+'</span></p><br>'+
                '<p>Contenido: <span class="contentProyect">'+data.content+'</span></p><br>'+
                '<p>Calificación: <span class="qualificationProyect">'+data.qualification+'</span></p>'+
              '</div>'+
            '</div>';
  // console.log(data,'data');
  $('.container').append(div);
}

//push proyect
var newProyect = (_title, _content, _qualification) => {
  refProyects.push({
    title:   _title,
    content: _content,
    qualification: _qualification
  })
};



var updateQualification = (key,qualification) => {
  database.ref('proyects/'+key).update({
    qualification: qualification
  });
}

var deleteProyect = (key) => {
  database.ref('proyects/'+key).remove()
}
