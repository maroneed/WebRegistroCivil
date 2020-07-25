//URLs
//-----Get Padres-----\\
const urlgetPersona = `https://localhost:44391/api/persona/GetPersona/`;
//----Post Tramite----\\
const urlpostTramite = `https://localhost:44353/Api/RecienNacido`;
//----Respuestas de los botones----\\
var formulario = document.getElementById('formulario');
var respuesta = document.getElementById('respuesta');
var respuesta2 = document.getElementById('respuesta2');
var respuestaFormulario = document.getElementById('respuestaFormulario');
var aceptar = document.getElementById('aceptar');
//----Para el local storage----\\
var padreDNI1;
var padreDNI2;
var genero;
var fecha;
//----Para el tramite nacimiento----\\
var padreId1;
var padreId2;

//----------------FUNCIONES DE LOS BOTONES--------------------\\
formulario.addEventListener('submit', function (e) { //Evento CLick
    e.preventDefault();

    var datos = new FormData(formulario);
    genero = datos.get('genero');
    fecha = datos.get('fecha');

    if (document.getElementById('dni1').value === '') {
        modalTramiteErroneo();
    }
    else{
        postTramite(newPost(datos), datos);
    }
    
});

function buscarPersona() {
    if (document.getElementById('dni1').value === '') {
        mostrarAlertaRoja();
    }
    else {
        getPersona(urlgetPersona + document.getElementById('dni1').value);
    }
}

function buscarPersona2() {
    if (document.getElementById('dni2').value === '') {
        mostrarAlertaRoja();
    }
    else {
        fetch(urlgetPersona + document.getElementById('dni2').value)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                mostrarRespuesta2(data);
                padreId2= parseInt(data.personaId, 10);
                padreDNI2= parseInt(data.dni, 10);
            })
    }
}

//----------------FUNCIONES FETCHS--------------------\\
function getPersona(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw Error(response.status);
            return response.json();
        })
        .then(data => {
            console.log(data);
            mostrarRespuesta(data);
            document.getElementById("buscarDNI2").disabled = false;
            document.getElementById("dni2").disabled = false;
            padreId1= parseInt(data.personaId, 10);
            padreDNI1 = parseInt(data.dni, 10);
            guardar_localstorage();

        })
        .catch(function (error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
            if (error.message === "400") {
                modalTramiteErroneo();
            }
            else {
                modalTramiteAlerta();
            }

        });
}

function postTramite(newPost, datos) {
    fetch(urlpostTramite, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(newPost),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {  //Compruebo si la API de persona responde.
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then(function (tramite) {
        console.log(tramite)
        mostrarRespuestaFormulario(datos);
        guardar_localstorage();
      })
      .catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        modalTramiteAlerta();
      })

}

//----------------FUNCIONES DE MENSAJE Y ALERTAS--------------------\\
function newPost(datos){
    var newPost = {
    "Persona_1_Id": padreId1,
    "Persona_2_Id": padreId2,
    "NumeroActa": datos.get('acta'),
    "Genero": datos.get('genero'),
    "FechaNacimiento": datos.get('fecha'),
    "LugarNacimiento": datos.get('lugar'),
    "PartidaNacimiento": true
    }
    return newPost;
}
function mostrarRespuesta(data) {
    respuesta.innerHTML = `
    <hr>
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading text-center">PERSONA ENCONTRADA</h4>
    <hr>
    <p>DATOS DE LA PESONA:
    <br>Numero de DNI: ${data.dni}
    <br>Nombre/s: ${data.nombre}
    <br>Apellido/s: ${data.apellido}
    </div>
    `
}

function mostrarRespuesta2(data) {
    respuesta2.innerHTML = `
    <hr>
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading text-center">PERSONA ENCONTRADA</h4>
    <hr>
    <p>DATOS DE LA PESONA:
    <br>Numero de DNI: ${data.dni}
    <br>Nombre/s: ${data.nombre}
    <br>Apellido/s: ${data.apellido}
    </div>
    `
}

function mostrarRespuestaFormulario(datos) {
    respuestaFormulario.innerHTML = `
    <hr>
    <div class="alert alert-success role="alert">
    <h4 class="alert-heading text-center">TRAMITE EFECTUADO</h4>
    <hr>
    <p>DATOS DEL TRAMITE:
    <br>NºActa: ${datos.get('acta')}
    <br>Genero: ${datos.get('genero')}
    <br>Fecha de Nacimiento: ${datos.get('fecha')}
    <br>Lugar de Nacimiento: ${datos.get('lugar')}
    <hr>
    <strong>Compruebe los datos de la Persona.</strong>
    </div>
    `
    aceptar.innerHTML = `
    <a style="margin-left: 400px" href="/nuevodni.html"class="btn btn-success">Ir al Registro</a>
    `
}
function mostrarAlertaRoja() {
    respuesta.innerHTML = `
    <hr>
    <div class="alert alert-danger" role="alert">
    Debe ingresar un <strong>numero DNI</strong>.
    </div>
    `
} 
function modalTramiteAlerta() {
    $('#myModal3').modal('show');
}
function modalTramiteErroneo() {
    $('#myModal2').modal('show');
}


//----------------FUNCIONE LOCAL STORAGE--------------------\\

function guardar_localstorage(){
    let datos ={
        Genero: genero,
        Fecha: fecha
    }
    let PadreDNI1 = padreDNI1;
    let PadreDNI2 = padreDNI2;

    localStorage.setItem("padreDNI1", JSON.stringify(PadreDNI1));
    localStorage.setItem("padreDNI2", JSON.stringify(PadreDNI2));
    localStorage.setItem("datos", JSON.stringify(datos));
    
    console.log(datos);
}

