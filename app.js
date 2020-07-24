
const express = require('express');
const app = express();

const path = require('path');
const port = 3002
const router = express.Router();
app.use(express.static(('public')));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

//turno
router.get('/nuevoturno', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_Turnos.html'))
});

router.get('/gestionarturno', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_GestionarTurno.html'))
});

//matrimonio
router.get('/tramitematrimonio', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_TramiteMatrimonio.html'))
});

router.get('/actamatrimonio', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_ActaMatrimonio.html'))
});

//divorcio
router.get('/tramitedivorcio', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_TramiteDivorcio.html'))
});

router.get('/busquedadivorcio', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_DivorcioBusqueda.html'))
});


//add the router
app.use('/', router);
// static files
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
