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

function saveActivity(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var team = {
        idUsuario: datos['idUsuario'],
        idProyecto: datos['idProyecto'],
        nombre: datos['nombre'],
        descripcion: datos['descripcion'],
        fechaFin: datos['fechaFin']
    };
    var sql = 'insert into pf_actividades set ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, team, function(error, resultado) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(constantes.OK);
        }
    });
}
/**
 * Funcion que registra un usuario
 * @param {type} pedido
 * @param {type} respuesta
 * @returns {undefined}
 */
function getActivityById(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    //
    numeroDocumento = datos['idAdctividad'];
    rol = 'user';
    var sql = 'select idUsuario , idProyecto, nombre, descripcion, fechaFin from pf_actividades where idAdctividad = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [numeroDocumento, rol], function(error, resultado) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(JSON.stringify(resultado));
        }
    });
}
//delete project
function deleteActivity(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idAdctividad = datos['idAdctividad'];
    var sql = 'delete from pf_actividades where idAdctividad = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [idProyecto, idUsuario], function(error, resultado) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(constantes.OK);
        }
    });
}

function listActivities(pedido, respuesta) {
    var sql = 'select idAdctividad, idUsuario , idProyecto, nombre, descripcion, fechaFin from pf_actividades where idProyecto = ?';
    //Se hace un insert mandado el objet completo
    var datos = pedido.body;
    var idProyecto = datos['idProyecto'];
    conexion.query(sql, [idProyecto], function(error, filas) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(JSON.stringify(filas));
        }
    });
}
//update
function updateActivity(pedido, respuesta) {
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idAdctividad = datos['idAdctividad'];
    var update = {
      idUsuario: datos['idUsuario'],
      idProyecto: datos['idProyecto'],
      nombre: datos['nombre'],
      descripcion: datos['descripcion'],
      fechaFin: datos['fechaFin']
    };
    var sql = 'update pf_actividades set ? where idAdctividad = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [update, idAdctividad], function(error, resultado) {
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
exports.getActivityById = getActivityById;
exports.saveActivity = saveActivity;
exports.updateActivity = updateActivity;
exports.listActivities = listActivities;
exports.deleteActivity = deleteActivity;
