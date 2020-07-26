
const express = require('express');
const app = express();



const path = require('path');
const port = 3002
const router = express.Router();
app.use(express.static(('public')));


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/index.html',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/pages/tramites/tramites.html', function(req,res){
  res.sendFile(path.join(__dirname+'/pages/tramites/tramites.html'));
});

router.get('/pages/turnos/dni/dni.html', function(req,res){
  res.sendFile(path.join(__dirname+'/pages/turnos/dni/dni.html'));
});

router.get('/pages/turnos/dni/dni.html', function(req,res){
  res.sendFile(path.join(__dirname+'/pages/turnos/turnos.html'));
});

router.get('/pages/turnos/defuncion/defuncion.html', function(req,res){
  res.sendFile(path.join(__dirname+'/pages/turnos/defuncion/defuncion.html'));
});

router.get('/pages/turnos/nacimiento/nacimiento.html', function(req,res){
  res.sendFile(path.join(__dirname+'/pages/turnos/nacimiento/nacimiento.html'));
});

router.get('/pages/turnos/matrimonio/matrimonio.html', function(req,res){
  res.sendFile(path.join(__dirname+'/pages/turnos/matrimonio/matrimonio.html'));
});

router.get('/pages/turnos/divorcio/divorcio.html', function(req,res){
  res.sendFile(path.join(__dirname+'/pages/turnos/divorcio/divorcio.html'));
});

router.get('/404-notfound.html', function(req,res){
  res.sendFile(path.join(__dirname+'/404-notfound.html'));
});

router.get('/img/mark.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/mark.png'));
}

router.get('/img/404-notfound.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/404-notfound.png'));
}

router.get('/img/footer.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/footer.png'));
}

router.get('/img/defuncion.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/defuncion.png'));
}

router.get('/img/delegaciones.jpeg'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/delegaciones.jpeg'));
}

router.get('/img/divorcio.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/divorcio.png'));
}

router.get('/img/documento.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/documento.png'));
}

router.get('/img/libros.jpg'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/libros.jpg'));
}

router.get('/img/logo.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/logo.png'));
}

router.get('/img/matrimonio.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/matrimonio.png'));
}

router.get('/img/nacimiento.png'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/nacimiento.png'));
}

router.get('/img/redes.jpg'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/redes.jpg'));
}

router.get('/img/tramites.jpg'), function(req,res){
  res.sendFile(path.join(__dirname+'/img/tramites.jpg'));
}

router.get('/gestionarturno', function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/RegistroCivil_GestionarTurno.html'))
});

//add the router
app.use('/', router);
// static files
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
