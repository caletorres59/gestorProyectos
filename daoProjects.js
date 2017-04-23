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
/**
 * Funcion que registra un usuario
 * @param {type} pedido
 * @param {type} respuesta
 * @returns {undefined}
 */
function save_project(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //    
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var registro = {
        nombre: datos['nombre'],
        fechaInicio: datos['fechaInicio'],
        fechaFin: datos['fechaFin'],
        etapaProyecto: datos['etapaProyecto']
    };
    var sql = 'insert into pf_proyectos set ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, registro, function(error, resultado) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(constantes.OK);
        }
    });
}
//delete project
function deleteProject(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //    
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idProyecto = [datos['idProyecto']];
    var sql = 'delete from pf_proyectos where idProyecto = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, idProyecto, function(error, resultado) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(constantes.OK);
        }
    });
}

function listProjects(pedido, respuesta) {
    var sql = 'select idProyecto, nombre, fechaInicio, fechaFin,etapaProyecto from pf_proyectos';
    //Se hace un insert mandado el objet completo
    console.log("estoy en lista");
    conexion.query(sql, function(error, filas) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(JSON.stringify(filas));
        }
    });
}

function updateProjects(pedido, respuesta) {
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idProyecto = [datos['idProyecto']];
    console.log(idProyecto);
    var update = {
        idProyecto: datos['idProyecto'],
        nombre: datos['nombre'],
        fechaInicio: datos['fechaInicio'],
        fechaFin: datos['fechaFin'],
        etapaProyecto: datos['etapaProyecto']
    };
    var sql = 'update pf_proyectos set ? where idProyecto = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [update, idProyecto], function(error, resultado) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(constantes.OK);
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
exports.save_project = save_project;
exports.listProjects = listProjects;
exports.deleteProject = deleteProject;
exports.updateProjects = updateProjects;