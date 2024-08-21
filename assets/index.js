
const express = require("express"); //variable para obtener los componentes de express 
const path = require("path"); //variable para ubicar mi html (ya que no está en la misma carpeta del js)
const mysql = require("mysql"); //variable para obtener los componentes de mysql
const app = express(); //Instancia de express para configurar y manejar el servidor web

let conexion = mysql.createConnection({ //Llamo a mi variable sql para conectarme a la base de datos, pongo mis datos de conexión.
  host: "localhost",
  user: "root",
  password: "",
  database: "zona_paga"
});

app.set("views", path.join(__dirname, "../views")); //Ubico mi html, salgo de assets e ingreso a views (creo xd)
app.set("view engine", "ejs"); //Motor de plantillas, le digo que utilzaré ejs para renderizar mis vistas

app.use(express.json()); //Middleware para recibir y enviar datos en formato json
 //Middleware es un software que actúa como intermediario entre dos aplicaciones o componentes de software

app.use(express.urlencoded({extended: false})); //Codificación para enviar datos a través de una URL

app.get("/", function(req, res){ //Ruta para mostrar la vista principal cuando ingresemos a http://localhost:3000/
  res.render("agregar_val"); //asi se llama mi archivo ejs
});

app.post("/agregar", function(req, res){ //Con app Post recuperamos los datos del formulario "/agregar" en agregar_val.ejs
  const datos = req.body; //Llamo todos los datos del formulario para después solo usar datos.nombrevariable

  let serie = datos.serie;
  let amid = datos.amid;
  let modelo = datos.modelo;

  let buscar = "SELECT * FROM validador WHERE serie_validador =" +serie+" "; //Busco si la serie del validador ya existe

  conexion.query(buscar, function(error, results){
    if(error){

      throw error; //Si hay error al buscar, lo muestro

    } else {

      if(row.length>0){ //Si hay más de un registro con la misma serie, muestro un mensaje
        
        console.log("La serie del validador ya existe");

      } else {

        let registrar = "INSERT INTO validador(id_validador, serie_validador, amid_validador, modelo_validador) VALUES (NULL, '"+serie+"', '"+amid+"', '"+modelo+"')";
        //Código para registrar los datos del formulario en la base de datos
        conexion.query(registrar, function(error, results){

          if(error){
            throw error; //SI hay error al insertar, lo muestro
          } else {
            console.log("Registro exitoso");
          }
        });
      } 
    };
  });  
});

app.listen(3000, function(){ //Levanto el servidor
  console.log("Servidor creado http://localhost:3000");
});

