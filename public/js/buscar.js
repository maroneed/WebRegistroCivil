const urlgetPersona = `https://localhost:44391/api/persona/GetPersona/`;


var buscar = document.getElementById('buscar');
var respuesta = document.getElementById('respuesta');
var aceptar = document.getElementById("aceptar");
var modificar = document.getElementById("modificar");

buscar.addEventListener('submit', function (e) {
    e.preventDefault();

    var dni = new FormData(buscar);
    var num = dni.get('dni');

    console.log(num);
    if (num === '') {
        mostrarAlertaRoja();
    }
    else {
        fetch(urlgetPersona + dni.get('dni'))
            .then(response => {
                if (!response.ok) throw Error(response.status);
                return response.json();
            })
            .then((data) => {
                mostrarRespuesta(data);
                guardar_localstorage(data);
            })

            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                if(error.message==="400"){
                    mostrarAlertaNumero(num);
                }
                else{
                    mostrarAlertaAmarilla();
                }
                
            });
    }

});

function GetPersonas() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(function (error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
}

function mostrarRespuesta(data){
    respuesta.innerHTML = `
    <hr>
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading text-center">PERSONA ENCONTRADA</h4>
    <hr>
    <p>DATOS DE LA PESONA:
    <br>Numero de DNI: ${data.dni}
    <br>Nombre/s: ${data.nombre}
    <br>Apellido/s: ${data.apellido}
    <br>Fecha de Nacimiento: ${data.fechaNacimiento}
    <br>Genero: ${data.genero.tipoGenero}
    <br>Estado Civil: ${data.estadoCivil.tipoEstadoCivil}
    <br>Nacionalidad: ${data.nacionalidad.tipoDeNacionalidad}
    <br>Provincia: ${data.provincia.nombreProvincia}
    <br>Localidad: ${data.localidad.nombreLocalidad}
     <br>Dirección: ${data.direccion}
    </div>
    `
    aceptar.innerHTML = `
    <a href="/gestionarturno"class="btn btn-success">Aceptar</a>
    `
    modificar.innerHTML = `
    <a style="margin-left: 345px" href="/modificardni" class="btn btn-success">Modificar</a>
    `
}
function mostrarAlertaRoja() {
    respuesta.innerHTML = `
    <div class="alert alert-danger" role="alert">
    Debe ingresar un numero DNI.
    </div>
    `
}

function mostrarAlertaNumero(num){
    respuesta.innerHTML = `
    <div class="alert alert-warning" role="alert">
    El numero de DNI <strong>${num}</strong> no se encuentra registrado.
    </div>
    `
}

function mostrarAlertaAmarilla(){
    respuesta.innerHTML = `
    <hr>
    <div class="alert alert-warning" role="alert">
     Ups! El sistema parece no responder. Estamos trabajando para solucionar su problema.
    <strong>Intentelo mas tarde.</strong>
    </div>
    `
}

function guardar_localstorage(data){
    let datos ={
        dni: data.dni,
        nombre: data.nombre,
        apellido: data.apellido,
        fecha: data.fechaNacimiento,
        genero: data.genero.tipoGenero,
        estado: data.estadoCivil.tipoEstadoCivil,
        nacionalidad: data.nacionalidad.tipoDeNacionalidad,
        provincia: data.provincia.nombreProvincia,
        localidad: data.localidad.nombreLocalidad,
        direccion: data.direccion
    }
    localStorage.setItem("datos", JSON.stringify(datos));
    console.log(datos);
}

