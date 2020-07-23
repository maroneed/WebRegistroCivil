var dni1 = 0;
var dni2 = 0;
var personaId1 = 0;
var personaId2 = 0;
var acta = 0;
var propuesta = "";
var fecha = "";
var acta = 0;


    function buscar()
    {
      dni1 = document.getElementById('dniImput').value;
      var httpDni = 'https://localhost:44391/api/persona/GetPersona/';
      const getDni = httpDni.concat(dni1);
      fetch(getDni)
      .then((respuestaDni) => {
            return respuestaDni.json();

      }).then((respuestaDni) => {

          console.log('no: ' + respuestaDni['personaId']);
          personaId1 = respuestaDni['personaId'];
          var httpDivorcio = 'https://localhost:44378/api/TramiteDivorcio/GetDivorcioPorPersonaId?idPersona1=';
          const getId = httpDivorcio.concat(personaId1);
          fetch(getId)
          .then((respuestaBusqueda) => {
              return respuestaBusqueda.json();
          }).then((respuestaBusqueda) => {

                if(respuestaBusqueda != null)
                {
                  console.log('respuesta: ' + respuestaBusqueda)
                  personaId1 = respuestaBusqueda['idPersona1'];
                  personaId2 = respuestaBusqueda['idPersona2'];
                  propuesta = respuestaBusqueda['propuesta'];
                  fecha = respuestaBusqueda['fecha'];
                  acta = respuestaBusqueda['actaMatrimonioId'];

                  var httpPersona = 'https://localhost:44391/api/persona/GetPersonaByID/';
                  const getPersona = httpPersona.concat(personaId2);
                  fetch(getPersona)
                  .then((respuestaPersona) => {
                      return respuestaPersona.json();
                  }).then((respuestaPersona) => {

                        dni2 = respuestaPersona['dni'];

                        const getPersona2 = httpPersona.concat(personaId1);
                        fetch(getPersona2)
                        .then((respuestaPersona2) => {
                            return respuestaPersona2.json();
                        }).then((respuestaPersona2) => {

                              dni1 = respuestaPersona2['dni'];

                              if(!personaId1   || !personaId2  || !propuesta  || !fecha  || !acta )
                              {
                                modalTramiteErroneo();
                              }else {
                                modalTramiteCorrecto();

                              }

                        });

                  });

                }

          });
      });



    }






    function modalTramiteCorrecto()
    {
      document.getElementById('m1p1').innerHTML = "Dni primera persona: " + dni1;
      document.getElementById('m1p2').innerHTML = "Dni segunda persona: " + dni2;
      document.getElementById('m1a1').innerHTML = "Numero de acta matrimonial: " + acta;
      document.getElementById('m1s4').innerHTML = "Propuesta: " + propuesta;
      document.getElementById('m1s5').innerHTML = "Fecha: " + fecha;

      $('#myModal').modal('show');
    }
    function modalTramiteErroneo()
    {
      $('#myModal2').modal('show');

    }
    function modalErrorConexion()
    {
      $('#myModal3').modal('show');

    }

    function alerta()
    {
       $('#alerta').show();
    }
