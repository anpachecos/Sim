
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

app.set("views", path.join(__dirname, "../views")); //Ubico mi html
app.set("view engine", "ejs"); //Motor de plantillas, le digo que utilzaré ejs para renderizar mis vistas

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", function(req, res){
  res.render("agregar_val");
});

app.post("/agregar", function(req, res){
  const datos = req.body;

  let serie = datos.serie;
  let amid = datos.amid;
  let modelo = datos.modelo;
  


  let buscar = "SELECT * FROM validador WHERE serie_validador =" +serie+" ";

  conexion.query(buscar, function(error, results){
      if(error){
        throw error;
      }else{
        if(CLIENT_RENEG_WINDOW.length>0){
          console.log("La serie del validador ya existe");
        } else {
          let registrar = "INSERT INTO validador(id_validador, serie_validador, amid_validador, modelo_validador) VALUES (NULL, '"+serie+"', '"+amid+"', '"+modelo+"')";
          conexion.query(registrar, function(error, results){
              if(error){
                throw error;
              }else{
                console.log("Registro exitoso");
              }
            });
        } 
      };
  });

  
});

app.listen(3000, function(){
  console.log("Servidor creado http://localhost:3000");
});

