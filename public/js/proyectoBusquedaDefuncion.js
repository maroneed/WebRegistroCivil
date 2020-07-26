var dni1 = 0;
var dni2 = 0;
var personaId1 = 0;
var personaId2 = 0;
var acta = 0;
var propuesta = "";
var fecha = "";
var acta = 0;
var nombre = ""
var apellido = ""

    function buscar()
    {
      //modalErrorConexion();

      dni1 = document.getElementById('dniImput').value;
      var http1 = 'https://localhost:44391/api/persona/GetPersona/'
      var rutaGet = http1.concat(dni1);

      if(dni1 == "" )
      {
        modalTramiteErroneo();

      }else{
        fetch(rutaGet)
        .then((respuestaPersona)=>{
          
          return respuestaPersona.json();

        }).then((respuestaPersona)=>{


           personaId1 = respuestaPersona['personaId'];
           nombre = respuestaPersona['nombre'];
           apellido = respuestaPersona['apellido'];
           fecha = respuestaPersona['fechaDefuncion'];
           console.log(personaId1);
           console.log(nombre);
           console.log(apellido);
           console.log('esta es la fecha: ' + fecha);


                if (fecha != '0001-01-01T00:00:00')
                {
                  console.log('no');

                  modalTramiteCorrecto();
                }
                else if(!fecha){
                  modalErrorConexion();

                }
                else{
                  console.log('si');

                  modalErrorConexion();
                }
        }).catch();//rutaGet
      }





    }






    function modalTramiteCorrecto()
    {
      document.getElementById('a').innerHTML = "Dni: " + dni1;
      document.getElementById('b').innerHTML = "Nombre: " + nombre;
      document.getElementById('c').innerHTML = "Apellido: " + apellido;
      document.getElementById('d').innerHTML = "Fecha de muerte: " + fecha;

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
