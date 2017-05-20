/*Modulo para la captura de variables GET y POST*/
var querystring = require('querystring');
/*Se importa el modulo npm MYSQL*/
var mysql = require('mysql');
var constantes = require('./constantes');

function conectardb() {
    console.log(constantes.host);
    console.log(constantes.user);
    console.log(constantes.pass);
    console.log(constantes.database);
    //Se hace una conexion a la base de datos
    conexion = mysql.createConnection({
        host: constantes.host,
        user: constantes.user,
        password: constantes.pass,
        database: constantes.database
    });
    //Se conecta a la base de datos
    conexion.connect(function(error) {
        if (error) {
            console.log(error);
            console.log('Problemas de conexion con mysql');
        } else {
            console.log('Conexion exitosa');
        }
    });
}
//Crear tabla
function crear(respuesta) {
    var sql = "drop table if exists articulos";
    //Ejecuta la consulta, a partir de la conexion a la base de datos
    conexion.query(sql, function(error, resultado) {
        if (error) {
            console.log(error);
            return;
        }
    });
    var sql2 = 'create table articulos (' + 'codigo int primary key auto_increment,' + 'descripcion varchar(50),' + 'precio float' + ')';
    conexion.query(sql2, function(error, resultado) {
        respuesta.writeHead(200, {
            'Content-Type': 'text/html'
        });
        if (error) {
            console.log(error);
            respuesta.write(constantes.ERROR);
        } else {
            respuesta.write(constantes.OK);
        }
        respuesta.end();
    });
    //Se construye la respuesta al cliente
}

function listTask2(pedido, respuesta) {
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idProyecto = datos['idProyecto'];
    console.log(idProyecto);
    //Se hace un insert mandado el objet completo
    var sql = 'SELECT t.idTarea, p.nombre, a.nombre as nombreActividad, t.nombreTarea, t.fechaInicio, t.fechaFin, t.porcentajeDesarrollo FROM pf_tareas t JOIN pf_actividades a ON t.idActividad = a.idActividad JOIN pf_proyectos p ON a.idProyecto = p.idProyecto WHERE p.idProyecto = ?';
    conexion.query(sql, [idProyecto], function(error, filas) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(JSON.stringify(filas));
        }
    });
}
/**
 * Funcion que registra un usuario
 * @param {type} pedido
 * @param {type} respuesta
 * @returns {undefined}
 */
function listProjectsItems(pedido, respuesta) {
    var datos = pedido.body;
    console.log(datos['idProyecto'] + "idProyecto");
    var idProyecto = [datos['idProyecto']];
    var sql = 'SELECT p.nombre AS nombreProyecto, p.fechaInicio, p.fechaFin, p.etapaProyecto, u.nombres AS representante, u.apellidos, u.email FROM  pf_proyectos p JOIN pf_usuarios u ON p.idUsuario = u.idUsuario WHERE p.idProyecto = ?';
    //Se hace un insert mandado el objet completo
    console.log("estoy en lista");
    conexion.query(sql, idProyecto, function(error, filas) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(JSON.stringify(filas));
        }
    });
}
/////
function listActivities(pedido, respuesta) {
    //Se hace un insert mandado el objet completo
    var datos = pedido.body;
    var idProyecto = datos['idProyecto'];
    var sql = 'select a.idActividad, a.idUsuario , a.idProyecto, a.nombre, a.descripcion, a.fechaInicio, a.fechaFin, u.nombres from pf_actividades a join pf_usuarios u on u.idUsuario = a.idUsuario  where idProyecto = ?';
    conexion.query(sql, [idProyecto], function(error, filas) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(JSON.stringify(filas));
        }
    });
}
/**
 *  Funcion que lista los tipos de cerveza los retorna como un String
 * @param {type} respuesta
 * @returns {undefined}
 */
//Habilita a las funciones para que sean llamadas o exportadas desde otros archivos
exports.conectardb = conectardb;
exports.listProjectsItems = listProjectsItems;
exports.listActivities = listActivities;
exports.listTask2 = listTask2;