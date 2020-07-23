//URLs
//-----Get DNI y Alta-----\\
const urlgetDNI = `https://localhost:44353/Api/TramiteDNI/NroDNI`;
const urlgetDNIextranjero = `https://localhost:44353/Api/TramiteDNI/NroDNIextranjero`;
const urlgetAlta = `https://localhost:44353/Api/TramiteDNI/Alta`;
//----Post Persona y tipo de tramite DNI----\\
const urlpostPersona = `https://localhost:44391/api/persona/SetPersona`;
const urlpostNacimiento = `https://localhost:44353/Api/Nacimiento`;
const urlpostExtranjero = `https://localhost:44353/Api/Extranjero`;
const urlpostEjemplar = `https://localhost:44353/Api/NuevoEjemplar`;


//Formulario (datos) y Respuesta (alerta)
var formulario = document.getElementById('formulario');
var respuesta = document.getElementById('respuesta');
var aceptar = document.getElementById('aceptar');

formulario.addEventListener('submit', function (e) { //Evento CLick
  e.preventDefault();
  var datos = new FormData(formulario); //Dastos de los campos
  //var tramite = newPostTramite(datos); //Nuevo tramite

  fetch(urlgetAlta)   //Compruebo si la API de tramite DNI responde.
    .then(response => {  //Si no responde.
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (datos.get('motivo') === "Extranjero") {  //Numero DNI para Argentinos
        otorgarDNIExtranjeros(datos);
      }
      else { //Numero DNI para Argentinos
        otorgarDNIArgentinos(datos);

      }
    })
    .catch(function (error) { //Mensaje de error de Tramite (Alerta amarilla).
      console.log('Hubo un problema con la petición Fetch:' + error.message);
      respuesta.innerHTML = ` 
      <hr>
      <div class="alert alert-warning" role="alert">
      Ups! El sistema parece no responder, estamos trabajando para solucionar su problema.
      <strong>Intentelo mas tarde.</strong>
      </div>
      `
    })


});

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
        respuesta.innerHTML = `
          <hr>
          <div class="alert alert-success role="alert">
          <h4 class="alert-heading">PERSONA REGISTRADA</h4>
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
          <a href="http://localhost:3000"class="btn btn-success">Aceptar</a>
          `
        
      })
      persona.catch(function (error) { //Mensaje de error de Persona.
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        respuesta.innerHTML = `
          <hr>
          <div class="alert alert-warning" role="alert">
              Ups! El sistema parece no responder, estamos trabajando para solucionar su problema.
              <strong>Intentelo mas tarde.</strong>
          </div>
          `
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
        respuesta.innerHTML = `
        <hr>
        <div class="alert alert-success role="alert">
        <h4 class="alert-heading">PERSONA REGISTRADA</h4>
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
        <a href="http://localhost:3000"class="btn btn-success">Aceptar</a>
        `
        
      })
      persona.catch(function (error) { //Mensaje de error de Persona.
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        respuesta.innerHTML = `
        <hr>
        <div class="alert alert-warning" role="alert">
        Ups! El sistema parece no responder, estamos trabajando para solucionar su problema.
        <strong>Intentelo mas tarde.</strong>
        </div>
        `
      })
    })
}

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








