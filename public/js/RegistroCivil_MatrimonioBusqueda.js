$(document).ready(function () {
    document.querySelector('#botonBuscar').addEventListener('click', traerDatosPersona);
});

function traerDatosPersona() {
    //Voy contra el micro de persona, cuando se verifica la existencia del dni
    var dni = document.getElementById("dniImput").value;
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
                    redireccion(idPersona);
                } else {
                //alert("Dni incorrecto, persona no registrada.");
                document.getElementById("mensajeActaFallida").innerHTML = "Dni incorrecto, persona no registrada.";
            }
        }
        reqper.send();
    } else {
        document.getElementById("mensajeActaFallida").innerHTML = "Debe ingresar el DNI";
    }
};

function redireccion(personaId){
    var lnk="/actamatrimonio?personaId="+personaId;
    window.location.href = lnk;
}