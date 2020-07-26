var dni1string = 0;
var dniSolicitanteString = "";
var dni1 = 0;
var dni2 = 0;
var personaId1 = 0;
var personaId2 = 0;
var personaSolicitanteId = 0;
var estadoCivilFallecido = "";
var propuesta = "";
var fecha = "";
var fechaReferencia = "";
var acta = 0;
var dniPareja = 0;
var tramiteDefuncion = {};
var parentescoTipo = 0;
var intP1 = 0;
var intP2 = 0;
var intActa = 0;


    function ConfirmarDefuncion()
    {
      const yo =
      {"nombre" : "gaby",
      "apellido" : "app"
      };
      console.log(yo);
      fecha = document.getElementById('fecha').value;
      console.log("Fecha de muerte: " + fecha);
      dni1string = document.getElementById('dniP1').value;
      dni1 = parseInt(dni1string,10);
      dniSolicitanteString = document.getElementById('dniSolicitante').value;
      dni2 = parseInt(dniSolicitanteString,10);
      document.getElementById('2dat').innerHTML = "Fecha de muerte: " + fecha;
      var st = document.getElementById('opcionesParentesco').value;

      if(fecha == "" || dniSolicitanteString == "" || dni1string == "")
      {
        mensaje = "Llene todos los campos para realizar el tramite";
        modalTramiteErroneo();

      }else{




      if(st == 'Madre')
      {
        parentescoTipo = 1;
      }
      else if(st == 'Padre')
      {
        parentescoTipo = 2;
      }
      else if(st == 'Tia/o')
      {
        parentescoTipo = 3;
      }
      else if(st == 'Sobrina/o')
      {
        parentescoTipo = 4;
      }
      else{
        parentescoTipo = 5;  //nieta/o

      }
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
          fechaReferencia = respuestaDni['fechaDefuncion']
          console.log('no: ' + estadoCivilFallecido);
          console.log('no: ' + fecha);
          if(fechaReferencia == '0001-01-01T00:00:00')
          {
            console.log('esta vivo')
            console.log('dni1: ' + dni1)

            const defuncion = {
              "Dni" : dni1,
	            "fechaDefuncion" : fecha
            };


            fetch('https://localhost:44391/api/persona/modifyFechaDefuncion', {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(defuncion),
            headers: {
                'Content-Type': 'application/json'
              },
            })

            .then((responseDefuncion) => {
              console.log('fecha modificada')
              if(estadoCivilFallecido == 'Casado/a')
              {
                console.log('esta casado')
                var httpsMatrimonio = 'https://localhost:44368/api/TramiteMatrimonioes/GetMatrimonioPersona?personaId=';
                const getMatrimonio = httpsMatrimonio.concat(personaId1);
                fetch(getMatrimonio)
                .then((respuestaMatrimonio) => {
                      return respuestaMatrimonio.json();

                }).then((respuestaMatrimonio) => {
                          acta = respuestaMatrimonio['numeroActa']
                          if(personaId1 == respuestaMatrimonio['contrayentePersonaUnoId'])
                          {
                            personaId2 = respuestaMatrimonio['contrayentePersonaDosId']
                            console.log(personaId1);
                            console.log(personaId2);
                            console.log(acta);
                            intP1 = parseInt(personaId1,10);
                            intP2 = parseInt(personaId2,10);
                            intActa = parseInt(acta,10);


                            const tDiv = {
                               "provinciaId" : 1,
                               "localidadId" : 1,
                               "calle" : "1",
                               "numero" : "1",
                               "idPersona1" : intP1,
                               "idPersona2" : intP2,
                               "actaMatrimonioId" : intActa,
                               "propuesta" : "Divorcio autogenerado por defuncion de uno de los contrayentes",
                               "solicitudTipoId" : 1
                             };
                             console.log(tDiv);

                             fetch( 'https://localhost:44378/api/TramiteDivorcio', {
                             method: 'POST',
                             mode: 'cors',
                             body: JSON.stringify(tDiv),
                             headers: {
                                 'Content-Type': 'application/json'
                               },
                             })
                             .then(responseTramite => {

                                 return responseTramite.json()
                             })
                          }else{
                            personaId2 = respuestaMatrimonio['contrayentePersonaUnoId']
                            console.log(personaId1);
                            console.log(personaId2);
                            console.log(acta);
                            intP1 = parseInt(personaId1,10);
                            intP2 = parseInt(personaId2,10);
                            intActa = parseInt(acta,10);

                            const tDiv = {
                               "provinciaId" : 1,
                               "localidadId" : 1,
                               "calle" : "1",
                               "numero" : "1",
                               "idPersona1" : intP1,
                               "idPersona2" : intP2,
                               "actaMatrimonioId" : intActa,
                               "propuesta" : "Divorcio autogenerado por defuncion de uno de los contrayentes",
                               "solicitudTipoId" : 1
                             };
                             fetch( 'https://localhost:44378/api/TramiteDivorcio', {
                             method: 'POST',
                             mode: 'cors',
                             body: JSON.stringify(tDiv),
                             headers: {
                                 'Content-Type': 'application/json'
                               },
                             })
                             .then(responseTramite => {

                                 return responseTramite.json()
                             })
                          }
                          console.log('acta: ' + acta);
                          console.log('idPersona1: ' + personaId1);
                          console.log('idPersona2: ' + personaId2);







                          //cambio estado civil de la pareja de la persona fallecida:
                          //consigo el dni de la pareja de la persona fallecida
                          var http2 = 'https://localhost:44391/api/persona/GetPersonaByID/'
                          var rutaGetP = http2.concat(personaId2);
                          console.log(rutaGetP);
                          fetch(rutaGetP)
                          .then((respuestaPersona)=>{
                            return respuestaPersona.json();
                          }).then((respuestaPersona)=>{
                            dniPareja = respuestaPersona['dni'];
                            console.log('dni pareja: ' + dniPareja)
                            const viudo= {
                                "Dni": dniPareja,
                                "EstadoCivil": "Viudo/a"
                            };
                            const divorciado= {
                                "Dni": dni1,
                                "EstadoCivil": "Divorciado/a"
                            };


                            //consigo id de personaSolicitante
                            var http3 = 'https://localhost:44391/api/persona/GetPersona/'
                            var rutaGet3 = http3.concat(dni2);
                            console.log("ruta de problemas:" + rutaGet3);
                            fetch(rutaGet3)
                            .then((respuestaPersona2)=>{
                              return respuestaPersona2.json();
                            }).then((respuestaPersona2)=>{
                              personaSolicitanteId = respuestaPersona2['personaId'];
                               actaapoyo = acta;
                               personaId2apoyo = personaId2;

                            });
                            var modificarEstadoCivil ='https://localhost:44391/api/persona/ModifyPersonaEstadoCivil';
                            fetch(modificarEstadoCivil, {
                            method: 'PUT',
                            mode: 'cors',
                            body: JSON.stringify(viudo),
                            headers: {
                                'Content-Type': 'application/json'
                              },
                            })
                            .then((respuestaPersona3) => {


                              fetch(modificarEstadoCivil, {
                              method: 'PUT',
                              mode: 'cors',
                              body: JSON.stringify(divorciado),
                              headers: {
                                  'Content-Type': 'application/json'
                                },
                              })
                              .then((respuestaPersona3) => {
                                return respuestaPersona3.json();

                              }).then((respuestaPersona3) => {


                                  const tramiteDefuncion = {
                                  "parentescoId" : parentescoTipo,
                                  "personaTramiteIdPersona" : personaSolicitanteId,
                                  "personaFallecidaIdPersona" : personaId1,
                                  "fechaDeMuerte" : fecha
                                  };
                                fetch( 'https://localhost:44388/api/TramiteDefuncion', {
                                method: 'POST',
                                mode: 'cors',
                                body: JSON.stringify(tramiteDefuncion),
                                headers: {
                                    'Content-Type': 'application/json'
                                  },
                                })
                                .then((responseTramite) => {
                                  return responseTramite.json();
                                  console.log('Post listo');
                                  document.getElementById('1dat').innerHTML = "Dni del fallecido: " + dni1;
                                  document.getElementById('2dat').innerHTML = "Fecha de muerte: " + fecha;
                                  alerta();
                                })
                              })//realizo el tramite defuncion

                            });

                        });
                      });




                  //});



                  document.getElementById('1dat').innerHTML = "Dni del fallecido: " + dni1;
                  document.getElementById('2dat').innerHTML = "Fecha de muerte: " + fecha;
                  alerta();  //tramite correcto
              }
              else{
                console.log('no esta casado')
                /*fetch('https://localhost:44391/api/persona/ModifyPersonaEstadoCivil', {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(defuncion),
                headers: {
                    'Content-Type': 'application/json'
                  },
                })
                .then((responseDivorcio) => {
*/
                    //realizo el tramite defuncion
                      const tramiteDefuncion = {
                      "parentescoId" : parentescoTipo,
                      "personaTramiteIdPersona" : personaSolicitanteId,
                      "personaFallecidaIdPersona" : personaId1,
                      "fechaDeMuerte" : fecha
                    };
                    fetch( 'https://localhost:44388/api/TramiteDefuncion', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(tramiteDefuncion),
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    })
                    .then((responseTramite) => {
                      document.getElementById('1dat').innerHTML = "Dni del fallecido: " + dni1;
                      document.getElementById('2dat').innerHTML = "Fecha de muerte: " + fecha;
                      //return responseTramite.json();
                      alerta();
                    });/*

                 })//get matrimonio*/

               }

               })//fetch 3 put para defuncion




          }else{
            console.log('esta muerto');
            yaMurio();
            //no se hace el tramite, porque ya esta muerto.
          }




      });//fetch 1


     }

    }

    function alerta()
    {
       $('#alerta').show();
    }

    function yaMurio()
    {
      $('#myModal3').modal('show');

    }
    function divorcio(lista)
    {
      fetch( 'https://localhost:44378/api/TramiteDivorcio', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(lista),
      headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(responseTramite => {

          return responseTramite.json()
      })

    }
    function modalTramiteErroneo()
    {
      $('#myModal2').modal('show');

    }
