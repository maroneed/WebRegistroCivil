//URLs
//-----Get DNI y Alta-----\\
const urlgetDNI = `https://localhost:44353/Api/TramiteDNI/NroDNI`;
const urlgetDNIextranjero = `https://localhost:44353/Api/TramiteDNI/NroDNIextranjero`;
const urlgetAlta = `https://localhost:44353/Api/TramiteDNI/Alta`;
//----Post Persona y tipo de tramite DNI----\\
const urlpostPersona = `https://localhost:44391/api/persona/SetPersona`;
const urlpostHijo = `https://localhost:44391/api/listahijos/SetHijos`;
const urlpostNacimiento = `https://localhost:44353/Api/Nacimiento`;
const urlpostExtranjero = `https://localhost:44353/Api/Extranjero`;
const urlpostEjemplar = `https://localhost:44353/Api/NuevoEjemplar`;


//Formulario (datos) y Respuesta (alerta)
var formulario = document.getElementById('formulario');
var respuesta = document.getElementById('respuesta');
var aceptar = document.getElementById('aceptar');

//Datos del local storage
var datosLocalStorage = obtener_localstorage();
console.log(datosLocalStorage);



//----------------FUNCION DEL BOTON SUBMIT-------------------\\
formulario.addEventListener('submit', function (e) { //Evento CLick
  e.preventDefault();
  var datos = new FormData(formulario); //Dastos de los campos

  fetch(urlgetAlta)   //Compruebo si la API de tramite DNI responde.
    .then(response => {  //Si no responde.
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (datos.get('motivo') === "Extranjero") {  //Numero DNI para Extranjeros
        otorgarDNIExtranjeros(datos);
      }
      else { //Numero DNI para Argentinos
        otorgarDNIArgentinos(datos);
      }
    })
    .catch(function (error) { //Mensaje de error de Tramite (Alerta amarilla).
      console.log('Hubo un problema con la petición Fetch:' + error.message);
      mostrarAlertaAmarilla();
    })


});

//----------------FUNCIONES FETCHS--------------------\\

//DNI Para Argentinos
function otorgarDNIArgentinos(datos) {
  var persona;

  fetch(urlgetDNI)
    .then(response => {  //Compruebo si la API de persona responde.
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((dni) => { //Si responde, se otorga un DNI.
      console.log(dni);
      persona = PostPersona(newPersona(datos, dni));

      persona.then(response => {  //Compruebo si la API de persona responde.
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      persona.then(function (per) { //Si responde, efectua el POST a persona
        console.log(per);
        newTramite(datos);
        postPadre1(dni);
        postPadre2(dni);
        mostrarRespuestaFormulario(datos, dni);
        localStorage.clear();
      })
      persona.catch(function (error) { //Mensaje de error de Persona.
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        mostrarAlertaAmarilla();
      })
    })
}

//DNI Para extranjeros.
function otorgarDNIExtranjeros(datos) {
  var persona;
  fetch(urlgetDNIextranjero) //DNI Extranjero
    .then(response => {  //Compruebo si la API de persona responde.
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((dni) => {
      console.log(dni);
      persona = PostPersona(newPersona(datos, dni));
      persona.then(response => {  //Compruebo si la API de persona responde.
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      persona.then(function (per) { //Si responde, efectua el POST a persona
        console.log(per);

        newTramite(datos); //Realiza el tramite.
        mostrarRespuestaFormulario(datos, dni)
        
      })
      persona.catch(function (error) { //Mensaje de error de Persona.
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        mostrarAlertaAmarilla();
        
      })
    })
}

//Fetch POST Persona
function PostPersona(newPost) {
  return fetch(urlpostPersona, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(newPost),
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

//Fetch POST Tramite
function postTramiteNacimiento(tramite) {
  fetch(urlpostNacimiento, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(tramite),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then(function (tramite) {
      console.log(tramite)
    })
    .catch(function (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
}

function postTramiteExtranjero(tramite) { 
  fetch(urlpostExtranjero, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(tramite),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then(function (tramite) {
      console.log(tramite)
    })
    .catch(function (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
}

function postTramiteNuevoEjemplar(tramite) { 
  fetch(urlpostEjemplar, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(tramite),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then(function (tramite) {
      console.log(tramite)
    })
    .catch(function (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
}
function postHijos(newPost){
  fetch(urlpostHijo, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(newPost),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then(function (tramite) {
      console.log(tramite)
    })
    .catch(function (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    })
}

//----------------FUNCIONES DE MENSAJE, OBJETOS Y ALERTAS--------------------\\
//Datos para el Post Tramite dni
function newTramite(datos) {
  var tramite;

  if (datos.get('motivo') === "Recien Nacido") {
    tramite = { "TramiteRecienNacidoId": 1 }
    postTramiteNacimiento(tramite)
  }

  if (datos.get('motivo') === "Extranjero") {
    tramite = { "PaisOrigen": datos.get('nacionalidad') }
    postTramiteExtranjero(tramite);
  }

  if (datos.get('motivo') === "Nuevo Ejemplar") {
    tramite = { "Descripcion": "Nuevo Ejemplar" }
    postTramiteNuevoEjemplar(tramite);
  }
}

function mostrarRespuestaFormulario(datos, dni) {
  respuesta.innerHTML = `
        <hr>
        <div class="alert alert-success role="alert">
        <h4 class="alert-heading text-center">PERSONA REGISTRADA</h4>
        <hr>
        <p>DATOS DE LA PESONA:
        <br>Numero de DNI: ${dni}
        <br>Nombre/s: ${datos.get('nombre')}
        <br>Apellido/s: ${datos.get('apellido')}
        <br>Fecha de Nacimiento: ${datos.get('fecha')}
        <br>Genero: ${datos.get('genero')}
        <br>Estado Civil: ${datos.get('estado')}
        <br>Nacionalidad: ${datos.get('nacionalidad')}
        <br>Provincia: ${datos.get('provincia')}
        <br>Localidad: ${datos.get('localidad')}
        <br>Dirección: ${datos.get('direccion')}</p>
        <hr>
        <strong>Compruebe los datos de la Persona.</strong>
        </div>
        `
        aceptar.innerHTML = `
        <a style="margin-left: 440px" href="/gestionarturno"class="btn btn-success">Aceptar</a>
        `
}

function mostrarAlertaAmarilla() {
    respuestadni.innerHTML = `
    <hr>
    <div class="alert alert-warning" role="alert">
    Ups! El sistema parece no estar disponible. Estamos trabajando para solucionar su problema.
    <strong>Intentelo mas tarde.</strong>
    </div>
    `
}


//Datos para el Post Persona
function newPersona(datos, num) {
  var persona = {
    "Dni": parseInt(num, 10),
    "Nombre": datos.get('nombre'),
    "Apellido": datos.get('apellido'),
    "FechaNacimiento": datos.get('fecha'),
    "Genero": datos.get('genero'),
    "EstadoCivil": datos.get('estado'),
    "Nacionalidad": datos.get('nacionalidad'),
    "Provincia": datos.get('provincia'),
    "Localidad": datos.get('localidad'),
    "Direccion": datos.get('direccion')
  }
  return persona;
}

function postPadre1(hijoDNI){
  if(localStorage.getItem("padreDNI1")){
    var newPost = {
      "PadreDNI": parseInt(localStorage.getItem("padreDNI1"), 10),
      "HijoDNI": parseInt(hijoDNI, 10)
    }
    postHijos(newPost);
  }
  else{
    console.log("No hay datos de padre1");
  }
}

function postPadre2(hijoDNI){
  if(localStorage.getItem("padreDNI2")){
    var newPost = {
      "PadreDNI": parseInt(localStorage.getItem("padreDNI2"), 10),
      "HijoDNI": parseInt(hijoDNI, 10)
    }
    postHijos(newPost);
  }
  else{
    console.log("No hay datos de padre2");
  }
  
  
}

//----------------FUNCIONE LOCAL STORAGE--------------------\\

function obtener_localstorage(){
  if(localStorage.getItem("datos")){
    let datos = JSON.parse(localStorage.getItem("datos"));

    document.getElementById('motivo').value = "Recien Nacido";
    document.getElementById('estado').value = "Soltero/a";
    document.getElementById('datepicker').value = datos.Fecha;
    document.getElementById('genero').value = datos.Genero;

    return datos;
  }
  else{
    console.log("No hay entradas en el local storage");
  }
}






