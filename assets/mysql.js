const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zona_paga'
})

connection.connect((err) => {
    if(err) throw err
    console.log('Connected to MySQL Server!')    
})

connection.query('SELECT * FROM ubicacion', (err, rows) => {
    if(err) throw err
    console.log('Data received from MySQL:')
    console.log(rows)
    console.log('La cantidad de resultados es: ' + rows.length)
})

/*const insertar = "INSERT INTO `ubicacion` (`ID_UBICACION`, `NOMBRE_UBICACION`, `DESCRIPCION_UBICACION`) VALUES (NULL, 'ubicacion de prueba', NULL)"
connection.query(insertar, (err, rows) => {
    if(err) throw err
    console.log('Data inserted into MySQL:')
    console.log(rows)
})*/

connection.end()