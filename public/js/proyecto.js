


    const json = [];
    var data = {};
    var contenido = document.querySelector('#contenido')
    var carrito = 0;
    var objetivo = document.getElementById('valor');
    var precio = 0;
    var pedido = [];
    var precioFinal = 0;
    fetch('https://localhost:44371/api/Producto')
    .then((respuesta) => {
        return respuesta.json();
    }).then((respuesta) => {


        tabla(respuesta);  //cargo los productos en pantalla

        //imprimo por consola
        for (let i = 0, c = respuesta.length; i < c; i++) {
          console.log("Producto: " + respuesta[i].nombre +"/codigo: "

        +respuesta[i].codigo +"/marca: "+ respuesta[i].marca+"/precio: "
        + respuesta[i].precio);

        }




    });

    function tabla(respuesta) {

        carrito = 0;
        console.log("c:"+carrito);
        for(let i of respuesta){


            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = i['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');

            var foto = i['productoId'];

            var img = "/img/";
            var jpg = ".jpg";
            var ruta = img.concat(foto,jpg);
            console.log("prueba: "+ruta);
            miNodoImagen.setAttribute('src', ruta);
            miNodoImagen.setAttribute('height', 100);
            miNodoImagen.setAttribute('width', 100);

            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent =  '$ ' + i['precio'] ;
            // Boton
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', i['productoId']);
            miNodoBoton.setAttribute('marcador2', i['precio']);
            miNodoBoton.setAttribute('marcador3', i['nombre']);

            miNodoBoton.addEventListener('click', agregarProducto);

            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            items.appendChild(miNodo);
            console.log("c2:"+carrito);

        }
    }



    const compra = {"clienteId" :"1",   //dejamos seteado un iD de cliente
    "ListaProductos" : pedido};

    function confirmarCompra()
    {
      if(precioFinal === 0)
      {
        var avisoCarritoVacio = alert("Tu carrito esta vacio!");

      }else{
        fetch('https://localhost:44371/api/Ventas', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(compra),
        headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => {
            return response.json()
        })
        .then(function(compra) {
            console.log(compra)
            var aviso = alert("Venta exitosa!");
            total.innerHTML = 0;
            canasta.innerHTML = "";
        })
        .catch(err => alert("No se pudo concretar la venta. Volve a intentarlo!"));
        console.log(compra);
        pedido = [];
        carrito = 0;
        precioFinal = 0;
        document.getElementById("valor").innerHTML = carrito;
        total.innerHTML = 0;
        canasta.innerHTML = "";
      }


    }





function agregarProducto(){

  var cantidad = 0;
  carrito = carrito + 1;
  console.log(carrito);
  document.getElementById("valor").innerHTML = carrito;
  c=carrito;
  var element = this.getAttribute('marcador');
  var articulo = String(element)

  var precioTomado = this.getAttribute('marcador2');
  var nombreProducto = this.getAttribute('marcador3');

  var precioProducto = parseInt(precioTomado, 10);
  console.log("ahorasi: "+precioProducto)

  console.log(precio);

  console.log("id: "+element);
  console.log("cantidad de productos en carrito: "+carrito);

  console.log("////////");
  pedido.push(articulo);
  console.log(pedido);
  precioFinal = precioFinal + precioProducto;
  console.log("valor de la compra: "+precioFinal);
  //agrego a la tabla de Compra

  total.innerHTML = "$ " + precioFinal;

  canasta.innerHTML += `

            <tr>
                <th id="Id">${ element}</th>
                <th id="nombre">${nombreProducto }</td>
                <th id="plata">${precioProducto }</td>



                <button type="button" id="boton2" class="btn btn-danger" onclick="eliminarProducto(${element},${precioProducto })"<img
                src="/img/carrito.png" />X</button>
            </tr>

            `

}


function eliminarProducto(element,precioProducto)
{
  var x = document.getElementById("boton2").getAttribute("marcador");
  var articulo = String(element); //convierto el id en string
  var index = pedido.indexOf(articulo); //busco el indice que coincide con lo que busco
  if (index > -1) {
     pedido.splice(index, 1);  //lo elimino si el indice existe. el 1 es la cantidad de ele que eliminara desde el indice que le marque
  }
  console.log("a eliminar(id): "+articulo);
  console.log("pedido modificado: "+pedido);
  carrito = carrito-1;
  if (carrito<0)
  {
    carrito = 0;
  }
  document.getElementById("valor").innerHTML = carrito;  //actualizo el carrito
  precioFinal = precioFinal - precioProducto;

  if (precioFinal<0)
  {
    precioFinal = 0;
    total.innerHTML = precioFinal;
  }
  total.innerHTML = "$ " + precioFinal;
  console.log("valor producto: "+precioProducto);


  $(document).on('click','#boton2',function(event){
    event.preventDefault();
    $(this).closest('tr').remove();

  })
}

function cancelarCompra()
{
    pedido = [];
    carrito = 0;
    precioFinal = 0;
    document.getElementById("valor").innerHTML = carrito; //actualizo el carrito
    console.log(pedido);
    canasta.innerHTML = "";
    PromptDemo();
    total.innerHTML = 0;

}

function PromptDemo() {
  //Ingresamos un mensaje a mostrar
  var aviso = alert("Venta cancelada!");

}
