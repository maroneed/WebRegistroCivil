var idPersona = 0;
//el idEmpleado es utilizado para cuando el turno es cancelado, no en esta interfaz
var idEmpleado = 2;

$(document).ready(function () {
  document.querySelector('#btnBuscarPersona').addEventListener('click', traerDatosPersona);
});


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
      // console.log(item.value);
    }
  });
  return pepe;
}

function traerDatosPersona() {
  //Voy contra el micro de persona, cuando se verifica la existencia del dni, luego modifico los datos en el turno seleccionado.
  var dni = document.getElementById("dniin").value;
  //42568589
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
                  //escribo los datos en el listado de confirmar turno
                  // document.getElementById("listte").innerHTML = localStorage.getItem("tramiteDni");
                  // document.getElementById("lisdni").innerHTML = dni;
                  document.getElementById("nomPersona").innerHTML = per.nombre+" "+per.apellido;
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
  //alert("Confirmo el turno con los datos ingresados.");
  // var dni = document.getElementById("dniin").value;
  var fecha = param;
  var tte = localStorage.getItem("tramiteDni");
  

  if ((idPersona != 0) || (fecha != "") || (tte != "")) {
      //armamos el json con idPersona + fecha + idEmpleado + tte
      var objTur = { personaid: idPersona.toString(), fechaturno: fecha, empleadoid: idEmpleado.toString(), tipotramite: tte };
      //var objTur = { personaid: idPersona, empleadoid= idEmpleado, tipotramite: tte };
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
              
              var idPersona = 0;
              var idEmpleado = 0;
              
              // document.getElementById("lisdni").innerHTML = "DNI";
              // document.getElementById("lisnya").innerHTML = "Nombre y Apellido";
              // document.getElementById("lisfec").innerHTML = "Fecha";
              // document.getElementById("listte").innerHTML = "Tipo de trámite";
              
              alert("El código de turno gestionado es: " + JSON.stringify(response.id));
          }
      };

  }

};


function seleccionFecha() {
  document.getElementById("lisfec").innerHTML=this.value;
};

function seleccionTt() {
  document.getElementById("listte").innerHTML = this.value;
};
