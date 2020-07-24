    var tramiteDivorcio = {};
    var calle = "";
    var numero = "";
    var idPersona1String = "";
    var idPersona2String = "";
    var idPersona1 = 0;
    var idPersona2 = 0;
    var actaString = "";
    var acta = 0;
    var idProvincia = 0;
    var idLocalidad = 0;
    var provincia = "";
    var localidad = "";
    var nombrePersona1 = "";
    var nombrePersona2 = "";
    var apellidoPersona1 = "";
    var apellidoPersona2 = "";
    var dniPersona1 = "";
    var dniPersona2 = "";
    var propuesta = "";
    var solicitudTipo = 1;
    var mensaje = "Chequee los datos y vuelva a intentarlo";
    var actaComparada = 0;



    fetch('https://localhost:44391/api/provincia/AllProvincias')
    .then((respuestaProvincias) => {
        return respuestaProvincias.json();
    }).then((respuestaProvincias) => {

        //console.log(respuesta.provincias.length);
        cargarProvincias(respuestaProvincias);  //cargo las provincias
          //cargo las provincias

        //imprimo por consola
        //for (let i = 0, c = respuesta.provincias.length; i < c; i++) {
          for (let i = 0, c = respuestaProvincias.length; i < c; i++){
          //console.log("Provincia: " + respuesta.provincias[i].nombre);
          console.log("Provincia: " + respuestaProvincias[i].nombre);
        }


       document.getElementById('')



    });


    console.log("esta es la provincia elegida: " + provincia);
    fetch('https://localhost:44391/api/localidad/AllLocalidades')
    .then((respuestaLocalidades) => {
        return respuestaLocalidades.json();
    }).then((respuestaLocalidades) => {

        //console.log(respuesta2.localidades.length);
        cargarLocalidades(respuestaLocalidades);  //cargo las provincias
          //cargo las provincias

        //imprimo por consola
        //for (let i = 0, c = respuesta2.localidades.length; i < c; i++) {
        //  console.log("Provincia: " + respuesta2.localidades[i].nombre);
      //  }





    });

    function cargarProvincias(respuestaProvincias) {


        for(let i of respuestaProvincias){




            // provincias
            let miNodoPrecio = document.createElement('option');//crea la opcion
            miNodoPrecio.textContent =  i['nombreProvincia'] ;//inserta el noombre a la opcion
            // Insertamos
            opcionesProvincias.appendChild(miNodoPrecio);  //opciones es id de la etiqueta select



        }
        provincia = document.getElementById('opcionesProvincias').value; //cargo la provincia a la variable
        console.log("y ahora: " + provincia);

    }

    function cargarLocalidades(respuestaLocalidades) {




        for(let i of respuestaLocalidades){




            // localidades
            let miNodoPrecio = document.createElement('option'); //creo la opcion
            miNodoPrecio.textContent =  i['nombreLocalidad'] ;   //inserta el nombre a la opcion
            // Insertamos
            opcionesLocalidades.appendChild(miNodoPrecio);  //opciones es id de la etiqueta select



        }
        localidad = document.getElementById('opcionesLocalidades').value; //cargo la provincia a la variable
        console.log("y ahora: " + localidad);

    }

    function confirmarActa()
    {

      document.getElementById('dniP1').value = "";
      document.getElementById('nombreP1').value  = "";
      document.getElementById('apellidoP1').value  = "";
      document.getElementById('dniP2').value = "";
      document.getElementById('nombreP2').value  = "";
      document.getElementById('apellidoP2').value  = "";
      var dato = document.getElementById('acta').value; //cargo numero de acta
      //console.log("acta: " + dato);
      var http = 'https://localhost:44368/api/TramiteMatrimonioes/GetMatrimonioPorActa?NumeroActa=';
      const rutaGet = http.concat(dato);
      console.log("rutaGet: " + rutaGet);

      if(dato == "")
      {
        document.getElementById('mensajeActa').innerHTML  = "";
        document.getElementById('mensajeActaFallida').innerHTML  = "Complete el campo, por favor . . .";

      }
      else{
        fetch(rutaGet)
        .then((respuestaActa) => {
            return respuestaActa.json();
        }).then((respuestaActa) => {
            if(respuestaActa==null)
            {
              document.getElementById('mensajeActa').innerHTML  = "";
              document.getElementById('mensajeActaFallida').innerHTML  = "Acta no encontrada";
            }
            else {
              document.getElementById('mensajeActaFallida').innerHTML  = "";
              document.getElementById('mensajeActa').innerHTML  = "Acta existente";
              acta = respuestaActa['NumeroActa'];
              console.log(respuestaActa);
              idPersona1String= respuestaActa['contrayentePersonaUnoId'];
              idPersona2String= respuestaActa['contrayentePersonaDosId'];
              console.log("personaid 1: " + idPersona1);
              console.log("personaid 2: " + idPersona2);
              var http2 = 'https://localhost:44391/api/persona/GetPersonaByID/'
              var rutaGet2 = http2.concat(idPersona1String);
              fetch(rutaGet2)
              .then((respuestaPersona)=>{
                return respuestaPersona.json();
              }).then((respuestaPersona)=>{
                dniPersona1 = respuestaPersona['dni'];
                nombrePersona1 = respuestaPersona['nombre'];
                apellidoPersona1 = respuestaPersona['apellido'];
                console.log("dni persona 1: " + dniPersona1);
                console.log("nombre persona 1: " + nombrePersona1);
                console.log("apellido persona 1: " + apellidoPersona1);
                document.getElementById('dniP1').value = dniPersona1;
                document.getElementById('nombreP1').value  = nombrePersona1;
                document.getElementById('apellidoP1').value  = apellidoPersona1;

              });
              var rutaGet3 = http2.concat(idPersona2String);
              fetch(rutaGet3)
              .then((respuestaPersona2)=>{
                return respuestaPersona2.json();
              }).then((respuestaPersona2)=>{
                dniPersona2 = respuestaPersona2['dni'];
                nombrePersona2 = respuestaPersona2['nombre'];
                apellidoPersona2 = respuestaPersona2['apellido'];
                console.log("dni persona 2: " + dniPersona1);
                console.log("nombre persona 2: " + nombrePersona1);
                console.log("apellido persona 2: " + apellidoPersona1);
                document.getElementById('dniP2').value = dniPersona2;
                document.getElementById('nombreP2').value  = nombrePersona2;
                document.getElementById('apellidoP2').value  = apellidoPersona2;
              });
            }


        });
      }



    }

    function confirmarDivorcio()
    {
      propuesta = document.getElementById('propuestaTexto').value;
      calle = document.getElementById('campoCalle').value;
      numero = document.getElementById('campoNumero').value;
      localidad = document.getElementById('opcionesLocalidades').value;
      provincia = document.getElementById('opcionesProvincias').value;
      actaString = document.getElementById('acta').value;
      acta = parseInt(actaString,10);
      idPersona1 = parseInt(idPersona1String,10);
      idPersona2 = parseInt(idPersona2String,10);

      if(propuesta == "" || calle == "" || numero == 0)
      {
        mensaje = "Llene todos los campos para realizar el tramite";
        modalTramiteErroneo(mensaje);

      }
      else {
        fetch('https://localhost:44391/api/localidad/AllLocalidades')
        .then((respuestaLocalidades) => {
            return respuestaLocalidades.json();
        }).then((respuestaLocalidades) => {

          for(let i of respuestaLocalidades){

              if(i['nombreLocalidad'] == localidad)
              {
                idLocalidad = i['localidadId'];
              }
          }
        });
        //--------------------provincia------------------------------
        fetch('https://localhost:44391/api/provincia/AllProvincias')
        .then((respuestaProvincias) => {
            return respuestaProvincias.json();
        }).then((respuestaProvincias) => {

          for(let i of respuestaProvincias){

              if(i['nombreProvincia'] == provincia)
              {
                idProvincia = i['provinciaId'];
              }
          }
           var st = document.getElementById('opcionesSolicitudTipo').value;
           if(st == 'Normal')
           {
             solicitudTipo = 1;
           }
           else{
             solicitudTipo = 2;

           }
            tramiteDivorcio = {
            "provinciaId" : idProvincia,
            "localidadId" : idLocalidad,
            "calle" : calle,
            "numero" : numero,
            "idPersona1" : idPersona1,
            "idPersona2" : idPersona2,
            "actaMatrimonioId" : acta,
            "propuesta" : propuesta,
            "solicitudTipoId" : solicitudTipo
          };
        });
        //-------------------------------------------------------------
        const divorcio1= {
            "Dni": dniPersona1,
            "EstadoCivil": "Divorciado/a"
        };
        const divorcio2= {
            "Dni": dniPersona2,
            "EstadoCivil": "Divorciado/a"
        };
        var modificarEstadoCivil ='https://localhost:44391/api/persona/ModifyPersonaEstadoCivil'
        var http5 = 'https://localhost:44378/api/TramiteDivorcio/GetDivorcioPorActa?actaMatrimonioId=';
        const rutaGet5 = http5.concat(acta);
        fetch(rutaGet5)
        .then((respuestaOk) => {

            return respuestaOk.json();
        }).then((respuestaOk) => {


            if(respuestaOk != null)
            {

              modalTramiteExistente();
            }else {
              fetch(modificarEstadoCivil, {
              method: 'PUT',
              mode: 'cors',
              body: JSON.stringify(divorcio1),
              headers: {
                  'Content-Type': 'application/json'
                },
              })
              .then(responseDivorcio => {
                  if(responseDivorcio.ok)
                  {
                    fetch(modificarEstadoCivil, {
                    method: 'PUT',
                    mode: 'cors',
                    body: JSON.stringify(divorcio2),
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    })
                    .then(responseDivorcio2 => {
                        if(responseDivorcio2.ok)
                        {
                          //Realizo el POST a TramiteDivorcio
                          fetch( 'https://localhost:44378/api/TramiteDivorcio', {
                          method: 'POST',
                          mode: 'cors',
                          body: JSON.stringify(tramiteDivorcio),
                          headers: {
                              'Content-Type': 'application/json'
                            },
                          })
                          .then(responseTramite => {
                              if(responseTramite.ok)
                              {
                                modalTramiteCorrecto();
                                clear();
                              }
                              else {
                                const soltero1= {
                                    "Dni": dniPersona1,
                                    "EstadoCivil": "Casado/a"
                                };
                                const soltero2= {
                                    "Dni": dniPersona2,
                                    "EstadoCivil": "Casado/a"
                                };
                                fetch(modificarEstadoCivil, {
                                method: 'PUT',
                                mode: 'cors',
                                body: JSON.stringify(soltero1),
                                headers: {
                                    'Content-Type': 'application/json'
                                  },
                                })
                                .then(responseDivorcio => {
                                  mensaje = "error de conexión, vuelva a intentarlo";
                                  modalTramiteErroneo(mensaje);
                                  clear();
                                  return responseTramite.json()
                                })
                                fetch(modificarEstadoCivil, {
                                method: 'PUT',
                                mode: 'cors',
                                body: JSON.stringify(soltero2),
                                headers: {
                                    'Content-Type': 'application/json'
                                  },
                                })
                                .then(responseDivorcio => {
                                  mensaje = "Se ha generado un error al cargar los datos!";
                                  modalTramiteErroneo(mensaje);
                                  clear();
                                  return responseTramite.json()

                              })
                            }
                              return responseTramite.json()
                          })
                          .catch();
                        }
                        else {
                          //error al modificar estado civil de persona 2
                          mensaje = "error de conexión, vuelva a intentarlo";
                          modalTramiteErroneo(mensaje);
                          clear();
                        }

                        return responseDivorcio2.json()
                    })
                  }
                  else {
                    //error al modificar estado civil de primera persona
                    mensaje = "error de conexión, vuelva a intentarlo";
                    modalTramiteErroneo(mensaje);
                    document.getElementById('campoCalle').value  = "";
                    document.getElementById('campoNumero').value  = "";
                    document.getElementById('propuestaTexto').value  = "";
                    document.getElementById('campoPiso').value  = "";
                    document.getElementById('campoCodigo').value  = "";
                  }
                  return responseDivorcio.json()
              })
            }
        });
      }
    }

    function CancelarDivorcio()
    {
      document.getElementById('acta').value = "";
      document.getElementById('dniP2').value = "";
      document.getElementById('nombreP2').value  = "";
      document.getElementById('apellidoP2').value  = "";
      document.getElementById('dniP1').value = "";
      document.getElementById('nombreP1').value  = "";
      document.getElementById('apellidoP1').value  = "";
      document.getElementById('mensajeActaFallida').innerHTML  = "";
      document.getElementById('mensajeActa').innerHTML  = "";
      document.getElementById('campoCalle').value  = "";
      document.getElementById('campoNumero').value  = "";
      document.getElementById('propuestaTexto').value  = "";
      document.getElementById('campoPiso').value  = "";
      document.getElementById('campoCodigo').value  = "";


    }
    function modalTramiteCorrecto()
    {
      document.getElementById('m1p1').innerHTML = "Dni primera persona: " + dniPersona1;
      document.getElementById('m1p2').innerHTML = "Dni segunda persona: " + dniPersona2;
      document.getElementById('m1a1').innerHTML = "Numero de acta matrimonial: " + acta;
      var servicio = "";
      if(solicitudTipo == 1)
      {
        servicio = 'Normal';
      }
      else{
        servicio = 'Urgente';

      }
      document.getElementById('m1s1').innerHTML = "Tipo de solicitud elegida: " + servicio;
      $('#myModal').modal('show');
    }
    function modalTramiteErroneo(mensaje)
    {
      document.getElementById('mensaje').innerHTML = mensaje;
      $('#myModal2').modal('show');
    }
    function modalTramiteExistente()
    {
      $('#myModal3').modal('show');
    }







    function clear()
    {
      document.getElementById('acta').value = "";
      document.getElementById('dniP2').value = "";
      document.getElementById('nombreP2').value  = "";
      document.getElementById('apellidoP2').value  = "";
      document.getElementById('dniP1').value = "";
      document.getElementById('nombreP1').value  = "";
      document.getElementById('apellidoP1').value  = "";
      document.getElementById('mensajeActaFallida').innerHTML  = "";
      document.getElementById('mensajeActa').innerHTML  = "";
      document.getElementById('campoCalle').value  = "";
      document.getElementById('campoNumero').value  = "";
      document.getElementById('propuestaTexto').value  = "";
      document.getElementById('campoPiso').value  = "";
      document.getElementById('campoCodigo').value  = "";
    }
