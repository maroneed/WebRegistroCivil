var dni1string = 0;
var dni1 = 0;
var dni2 = 0;
var personaId1 = 0;
var personaId2 = 0;
var estadoCivilFallecido = "";
var propuesta = "";
var fecha = "";
var acta = 0;


    function ConfirmarDefuncion()
    {


      dni1string = document.getElementById('dniP1').value;
      dni1 = parseInt(dni1string,10);

      console.log("dni fallecido: " + dni1)
      var httpDni = 'https://localhost:44391/api/persona/GetPersona/';
      const getDni = httpDni.concat(dni1);
      fetch(getDni)
      .then((respuestaDni) => {
            return respuestaDni.json();

      }).then((respuestaDni) => {

          console.log('no: ' + respuestaDni['personaId']);
          personaId1 = respuestaDni['personaId'];
          estadoCivilFallecido = respuestaDni['estadoCivil']['tipoEstadoCivil']
          fecha = respuestaDni['fechaDefuncion']
          console.log('no: ' + estadoCivilFallecido);
          console.log('no: ' + fecha);
          if(fecha == '0001-01-01T00:00:00')
          {
            console.log('esta vivo')
            console.log('dni1: ' + dni1)

            const defuncion = {
              "Dni" : dni1,
	            "fechaDefuncion" : "2020-05-05T10:48:07"
            };


            fetch('https://localhost:44391/api/persona/modifyFechaDefuncion', {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(defuncion),
            headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(responseDefuncion => {
                return responseDefuncion.json()
            })
            .then(function(divorcio) {
              console.log('fecha modificada')
              if(estadoCivilFallecido == 'casado')
              {
                console.log('esta casado')

              }
              else{
                console.log('no esta casado')

              }

            })
          }else{
            console.log('esta muerto')
            //no se hace el tramite, porque ya esta muerto.
          }



      });



    }

    function alerta()
    {
       $('#alerta').show();
    }
