//URLs
const urlputPersona = `https://localhost:44391/api/persona/ModifyPersona`;
const urlpostTramite = `https://localhost:44353/Api/NuevoEjemplar`;
const urlgetAlta = `https://localhost:44353/Api/TramiteDNI/Alta`;

//Formulario (datos) y Respuesta (alerta)
var formulario = document.getElementById('formulario');
var respuesta = document.getElementById('respuesta');
var aceptar = document.getElementById('aceptar'); //Para voler al menu principal una vez efectuado el tramite.

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    var datos = new FormData(formulario);
    var tramite = newPost(datos);

    fetch(urlgetAlta)
        .then(response => {  //Si no responde.
            if (!response.ok) throw Error(response.status);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            modificarPersona(datos, tramite)
        })
        .catch(function (error) { //Mensaje de error de Tramite.
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

//Put a Persona
function modificarPersona(datos, tramite) {
    persona = putPersona(newPut(datos)); //Compruebo si la API de persona responde.
    persona.then(response => {  //Si no responde.
        if (!response.ok) throw Error(response.status);
        return response.json();
    })
    persona.then(function (per) { //Se efectua el PUT a persona
        console.log(per);

        respuesta.innerHTML = `
        <hr>
        <div class="alert alert-success role="alert">
        <h4 class="alert-heading">PERSONA REGISTRADA</h4>
        <hr>
        <p>DATOS DE LA PESONA:
        <br>Numero de DNI: ${datos.get('dni')}
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
        postTramite(tramite); //Se efectua el POST al tramite.

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
}

//Nuevo Tramite
function newPost(datos) {
    var tramite = {
        "Descripcion": datos.get('motivo')
    }
    return tramite
}

//Nueva Persona
function newPut(datos) {
    var persona = {
        "Dni": parseInt(datos.get('dni'), 10),
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

//Post tramite fetch.
function postTramite(tramite) {

    fetch(urlpostTramite, {
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

//Put Persona Fetch
function putPersona(persona) {
    console.log(persona);
    return fetch(urlputPersona, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(persona),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}