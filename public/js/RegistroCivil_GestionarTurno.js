//global
tipoTramite="";

$(document).ready(function () {
    document.querySelector('#botTurno').addEventListener('click', buscarTurno);
    document.querySelector('#bottur').addEventListener('click', redireccion);
});

function redireccion(){
    var lnk="";
    switch (tipoTramite) {
        case "tramiteMatrimonio":
            lnk="/tramitematrimonio"
            break;
        case "tramiteDni":
            lnk = "/tramitedni"
            break;
        case "tramiteNac":
            lnk = "/tramitenacimiento"
            break;
        case "tramiteDiv":
            lnk = "/tramitedivorcio"
            break;
        case "tramiteDef":
            lnk = "/tramitedefuncion"
            break;
        default:
        ""
    }
    if (lnk ==""){
        alert("Primero debe ingresar un DNI y buscar el turno");
    }else{
        window.location.href = lnk;
    }
}

function buscarTurno(){
    //alert("buscando turno");
    traerDatosPersona();
}


function traerDatosPersona() {
    //Voy contra el micro de persona, cuando se verifica la existencia del dni
    var dni = document.getElementById("dni").value;
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
                    //busco el turno
                    var reqtur = new XMLHttpRequest()
                    var URLTUR = "https://localhost:44367/api/turnoes/GetTurnoPorId?idPersona=" + idPersona;
                    reqtur.open("GET", URLTUR, true);
                    reqtur.onload = function () {
                        var tur = null;
                        tur = JSON.parse(this.response);
                        if (reqtur.status >= 200 && reqtur.status < 400) {
                            if (tur != null){
                                document.getElementById("lisdni").innerHTML = "DNI: "+dni;
                                document.getElementById("lisnya").innerHTML = "Nombre y Apellido: "+per.nombre+" "+per.apellido;
                                document.getElementById("lisfec").innerHTML = "Fecha del turno: "+tur.fechaTurno;
                                document.getElementById("lisfecS").innerHTML = "Fecha de solicitud: "+tur.fechasolicitud;
                                document.getElementById("lismail").innerHTML ="Email: "+(tur.emailTx||"no informado");
                                document.getElementById("listel").innerHTML ="Teléfono: "+(tur.telefono||"no informado");
                                document.getElementById("listtra").innerHTML ="Tipo de tramite: "+tur.tipoTramite;
                                tipoTramite=tur.tipoTramite;
                            }else {
                                document.getElementById("dni").value=""; 
                                alert("El Dni ingresado no posee turno en el día de hoy."); 
                            }
                        } else {
                            alert("error turno");
                        }
                    };
                    reqtur.send();
                } else {
                alert("Dni incorrecto, persona no registrada.");
            }
        }
        reqper.send();
    } else {
        document.getElementById("lisdni").innerHTML = "Dni";
        document.getElementById("lisnya").innerHTML = "Nombre y Apellido";
        document.getElementById("lisfec").innerHTML = "Fecha del turno";
        document.getElementById("lisfecS").innerHTML = "Fecha de solicitud";
        document.getElementById("lismail").innerHTML ="Email";
        document.getElementById("listel").innerHTML ="Teléfono";
        document.getElementById("listtra").innerHTML ="Tipo de tramite";
        alert("Debe ingresar el dni");
    }
};