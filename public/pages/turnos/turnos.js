var idPersona = 0;
//el idEmpleado es utilizado para cuando el turno es cancelado, no en esta interfaz
var idEmpleado = 2;
var nombre;
var apellido;

$(document).ready(function () {
  document.querySelector('#btnBuscarPersona').addEventListener('click', traerDatosPersona);
});


function mostrarStylos() {
  var x = document.getElementById("nomPersona");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
   x.style.display = "none";
  }
} 

function mostrarStylos2() {
  var x = document.getElementById("fechaHoraselec");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
   x.style.display = "none";
  }
} 

function onlyOne(checkbox) { 
  var pepe;
  var checkboxes = document.getElementsByName('horario')
  checkboxes.forEach((item) => {
    if (item != checkbox) {
      item.checked = false;
    }
    if (item.checked == true) {
      let itemV = item.value;
      pepe = itemV;
    }
  });
  return pepe;
}

function traerDatosPersona() {
  //Voy contra el micro de persona, cuando se verifica la existencia del dni, luego modifico los datos en el turno seleccionado.
  var dni = document.getElementById("dniin").value;
  if (dni != "") {
      var reqper = new XMLHttpRequest()
      var URL = "https://localhost:44391/api/persona/GetPersona/" + dni;
      reqper.open("GET", URL, true);
      reqper.onload = function () {
          var per = null;
          idPersona = 0;
          per = JSON.parse(this.response);
          var txt = "";
          if (reqper.status >= 200 && reqper.status < 400) {
                  idPersona = per.personaId;
                  nombre = per.nombre;
                  apellido = per.apellido;
                  document.getElementById("nomPersona").innerHTML = per.nombre+" "+per.apellido;
                  mostrarStylos();
                  mostrarStylos2();
          } else {
              alert("El dni no existe");
          }
      }
      reqper.send();
  } else {
      document.getElementById("btnBuscarPersona").innerHTML = "";
      alert("Debe ingresar el dni");
  }
};


function confirmarTurno(param) {
  var fecha = param;
  var tte = localStorage.getItem("tipoTurno");
  var email = document.getElementById("email").value;
  var telef = document.getElementById("telef").value;
  

  if ((idPersona != 0) || (fecha != "") || (tte != "")) {
      var objTur = { personaid: idPersona.toString(), fechaturno: fecha, empleadoid: idEmpleado.toString(), tipotramite: tte, EmailTx: email, TelefonoTx: telef};
      var jsnTur = JSON.stringify(objTur);
      console.log(jsnTur);
      //enviamos el post
      //armo la solicitud
      var xmlhttp = new XMLHttpRequest();
      var URL = "https://localhost:44367/api/Turnoes/PostTurno";
      xmlhttp.open("POST", URL, true);
      xmlhttp.setRequestHeader("Content-Type", "application/json");

      xmlhttp.send(jsnTur);
      xmlhttp.onload = () => {
          if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
              // parse JSON
              const response = JSON.parse(xmlhttp.responseText);
              modalTramiteCorrecto(fecha);
          }else{
            modalTramiteErroneo();
          }
      };

  }

};

function cancelarTurno() {
  localStorage.removeItem("tipoTurno");
  window.location.href = "/pages/tramites/tramites.html";
}

function modalTramiteCorrecto(param){
    document.getElementById('numDni').innerHTML = "Numero de DNI: " + document.getElementById("dniin").value;
    document.getElementById('nomApe').innerHTML = "Nombre y Apellido: " + nombre + " " + apellido;
    document.getElementById('tipoTurno').innerHTML = "Tipo de Turno: " + localStorage.getItem("tipoTurno");
    document.getElementById('fechTur').innerHTML = "Fecha de Turno: " +  moment(param).format('LLLL');

    $('#myModal').modal('show');
}
    
function modalTramiteErroneo(){
    $('#myModal2').modal('show');
}