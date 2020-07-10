
const express = require('express');
const app = express();

const path = require('path');
const port = 3002
const router = express.Router();
app.use(express.static(('public')));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/nuevoturno', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_Turnos.html'))
});

router.get('/tramitematrimonio', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_TramiteMatrimonio.html'))
});

//add the router
app.use('/', router);
// static files
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
