$(document).ready(function () {
    document.querySelector('#botTramite').addEventListener('click', crearTramiteMatrimonio);
    cargarProfesiones();
    //get persona contrayente1
    document.querySelector('#dniC1').addEventListener('blur', traerPersona);
    document.querySelector('#dniP11').addEventListener('blur', traerPersona);
    document.querySelector('#dniP12').addEventListener('blur', traerPersona);
    document.querySelector('#dniT11').addEventListener('blur', traerPersona);
    document.querySelector('#dniT12').addEventListener('blur', traerPersona);
    //get persona contrayente2
    document.querySelector('#dniC2').addEventListener('blur', traerPersona);
    document.querySelector('#dniP21').addEventListener('blur', traerPersona);
    document.querySelector('#dniP22').addEventListener('blur', traerPersona);
    document.querySelector('#dniT21').addEventListener('blur', traerPersona);
    document.querySelector('#dniT22').addEventListener('blur', traerPersona);
    
});

function traerPersona(){
    var dni = document.getElementById(this.id).value;
    var str=this.id.substring(3);
    //Voy contra el micro de persona, cuando se verifica la existencia del dni.
    //42568589
    if (dni != "") {
        var reqper = new XMLHttpRequest()
        var URL = "https://localhost:44391/api/persona/GetPersona/" + dni;
        reqper.open("GET", URL, true);
        reqper.onload = function () {
            var per = null;
            per = JSON.parse(this.response);
            if (reqper.status >= 200 && reqper.status < 400) {
                //falta manejar error del lado de msPersona. cuando el dni no existe, el ms tira error
                //ContrayenteUnoId = per.personaId;
                let $miPersona = document.querySelector('#dni'+str);
                //me guardo como atributo el personaId
                $miPersona.setAttribute('personaId', per.personaId);
                //escribo el nombre debajo del dni.
                document.getElementById("nya"+str).innerHTML = per.nombre+" "+per.apellido;
            } else {
                alert("error");
            }
        }
        reqper.send();
    }
}

function cargarProfesiones(){
    var reqpro = new XMLHttpRequest()
    var URL = "https://localhost:44368/api/profesiones/getprofesiones";
    reqpro.open("GET", URL, true);
    reqpro.onload = function () {
        var data = null;
        data = JSON.parse(this.response);
        if (reqpro.status >= 200 && reqpro.status < 400) {
            //falta manejar erro del lado de msPersona. cuando el dni no existe, el ms  tira error
            data.forEach(profesiones => {
                //profesiones contrayente 1
                let $miSelProC1 = document.querySelector('#proC1');
                let miOpcionC1 = document.createElement('option');
                miOpcionC1.textContent = profesiones.profesionTx;
                miOpcionC1.setAttribute('profId', profesiones.profesionId);
                $miSelProC1.appendChild(miOpcionC1);
                //profesiones contrayente 2
                let $miSelProC2 = document.querySelector('#proC2');
                let miOpcionC2 = document.createElement('option');
                miOpcionC2.textContent = profesiones.profesionTx;
                miOpcionC2.setAttribute('profId', profesiones.profesionId);
                $miSelProC2.appendChild(miOpcionC2);
            });
        } else {
            alert("error");
        }
    }
    reqpro.send();
}

function crearTramiteMatrimonio() {

   //recopilo los datos del formulario
   var ContrayenteUnoId = document.getElementById("dniC1").getAttribute("personaId");
   var PadreMadreUnoUnoId = document.getElementById("dniP11").getAttribute("personaId");
   var PadreMadreDosUnoId = document.getElementById("dniP12").getAttribute("personaId");
   var TestigoUnoUnoId = document.getElementById("dniT11").getAttribute("personaId");
   var TestigoDosUnoId = document.getElementById("dniT12").getAttribute("personaId");

   var ContrayenteDosId = document.getElementById("dniC2").getAttribute("personaId");
   var PadreMadreUnoDosId = document.getElementById("dniP21").getAttribute("personaId");
   var PadreMadreDosDosId = document.getElementById("dniP22").getAttribute("personaId");
   var TestigoUnoDosId = document.getElementById("dniT21").getAttribute("personaId");
   var TestigoDosDosId = document.getElementById("dniT22").getAttribute("personaId");

    //tramiteId no deberia?? ser el id creado automaticamente autoincremental??
    var TramiteId = "1";

    //obtenemos acta, tomo y folio
    var actain = document.getElementById("actin").value;
    var tomoin = document.getElementById("tomin").value;
    var folioin = document.getElementById("folin").value;
    //obtenemos los ids de profesiones
    var proc1 = document.getElementById("proC1");
    var ProfesionUnoId = (proc1.options[proc1.selectedIndex]).getAttribute("profId");
    var proc2 = document.getElementById("proC2");
    var ProfesionDosId = (proc2.options[proc2.selectedIndex]).getAttribute("profId");
    //armamos el json 
    var objTma = {
        ContrayenteUnoId: ContrayenteUnoId.toString(),
        PadreMadreUnoUnoId: PadreMadreUnoUnoId.toString(),
        PadreMadreDosUnoId: PadreMadreDosUnoId.toString(),
        TestigoUnoUnoId: TestigoUnoUnoId.toString(),
        TestigoDosUnoId: TestigoDosUnoId.toString(),
        ProfesionUnoId: ProfesionUnoId.toString(),
        ContrayenteDosId: ContrayenteDosId.toString(),
        PadreMadreUnoDosId: PadreMadreUnoDosId.toString(),
        PadreMadreDosDosId: PadreMadreDosDosId.toString(),
        TestigoUnoDosId: TestigoUnoDosId.toString(),
        TestigoDosDosId: TestigoDosDosId.toString(),
        ProfesionDosId: ProfesionDosId.toString(),
        NumeroActa: actain.toString(),
        Tomo: tomoin.toString(),
        NumeroFolio: folioin.toString(),
        TramiteId: TramiteId.toString()
    }
    var jsnTma = JSON.stringify(objTma);
    console.log(jsnTma);

    //armo la solicitud
    var xmlhttp = new XMLHttpRequest();
    var URL = "https://localhost:44368/api/TramiteMatrimonioes/PostMatrimonio";
    xmlhttp.open("POST", URL, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.send(jsnTma);

    xmlhttp.onload = () => {
        if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
            // parse JSON
            const response = JSON.parse(xmlhttp.responseText);

            document.getElementById("actin").value = "";
            document.getElementById("tomin").value = "";
            document.getElementById("folin").value = "";
            

            alert("El código de Tramite Matrimonio gestionado es: " + JSON.stringify(response.id));
        }
    };
}
