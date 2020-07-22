$(document).ready(function () {
    cargaractta();
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function traerPersona(idPersona){
    var reqper = new XMLHttpRequest()
    var URL = "https://localhost:44391/api/persona/GetPersonaByID/" + idPersona;
    var out="";
    reqper.open("GET", URL, false);
    reqper.onload = function () {
        var per = null;
        per = JSON.parse(this.response);
        if (reqper.status >= 200 && reqper.status < 400) {
             out = per.nombre+" "+per.apellido+" con DNI: "+per.dni+" ";
       }
    }
    reqper.send();
    return out;
}

function cargaractta() {
    var personaId = getUrlParameter('personaId');
    var reqtra = new XMLHttpRequest()
    var URL = "https://localhost:44368/api/TramiteMatrimonioes/GetMatrimonioPersona?personaId=" + personaId;

    reqtra.open("GET", URL, true);
    reqtra.onload = function () {
        var per = null;
        tramite = JSON.parse(this.response);
        if (reqtra.status >= 200 && reqtra.status < 400) {
            //var c1=traerPersona(idPersona);
            var fecha = tramite.fechaCelebracion.substring(0,10);
            var contrayente1 = traerPersona(tramite.contrayentePersonaUnoId);
            var contrayente2 = traerPersona(tramite.contrayentePersonaDosId);

            //datos
            document.getElementById("p1").innerHTML = ` Se certifica que en el Acta número: `+ tramite.numeroActa+
            `, tomo: `+tramite.tomo+ ` y número de folio: `+tramite.numeroFolio+
            `, celegrado en la presente delegación.`
            //matrimonio
            document.getElementById("p2").innerHTML = `Se encuentra labrado el matrimonio de `+
            contrayente1+` con `+ contrayente2+`, celebrado el día `+
            fecha+`.`;
            //contrayente1
            document.getElementById("p3").innerHTML = contrayente1 + ` de profesión `+ tramite.profesionUnoTx+
            `, es hijo/a de `+traerPersona(tramite.padreMadreUnoUnoId)+` y de `+traerPersona(tramite.padreMadreDosUnoId)+`.`+
            ` Siendo testigos del acto `+traerPersona(tramite.testigoUnoUnoId) + ' y '+traerPersona(tramite.testigoDosUnoId)+
            ` por la primera parte.`;
            //contrayente2
            document.getElementById("p4").innerHTML = contrayente2 + ` de profesión `+ tramite.profesionDosTx+
            `, es hijo/a de `+traerPersona(tramite.padreMadreUnoDosId)+` y de `+traerPersona(tramite.padreMadreDosDosId)+`.`+
            ` Siendo testigos del acto `+traerPersona(tramite.testigoUnoDosId) + ' y '+traerPersona(tramite.testigoDosDosId)+
            ` por la segunda parte.`;
            
            //cierre
            document.getElementById("p5").innerHTML = "Se da fe que el texto concuerda con el acta expresada. Registro Nacional de las Personas."           
        }
    }
    reqtra.send();
}