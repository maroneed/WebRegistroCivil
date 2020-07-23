const express = require('express')
const app = express()
const path = require('path');
const port = 3000
const router = express.Router();

app.use(express.static('public'));
router.get('/', function(req, res){ 

    res.sendFile(path.join(__dirname+'/public/html/tramitedni.html'));
});

router.get('/nuevodni.html', function(req, res){ 

    res.sendFile(path.join(__dirname+'/public/html/nuevodni.html'));
});

router.get('/buscardni.html', function(req, res){ 

    res.sendFile(path.join(__dirname+'/public/html/buscardni.html'));
});

router.get('/modificardni.html', function(req, res){ 

    res.sendFile(path.join(__dirname+'/public/html/modificardni.html'));
});

app.use('/',router);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))