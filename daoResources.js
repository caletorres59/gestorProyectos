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

function saveResource(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var team = {
        idProyecto: datos['idProyecto'],
        nombre: datos['nombre'],
        cantidad: datos['cantidad'],
        descripcion: datos['descripcion'],
        ubicacion: datos['ubicacion']
    };
    var sql = 'insert into pf_recursos set ?';
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
function getResourceById(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    //
    numeroDocumento = datos['idRecurso'];
    rol = 'user';
    var sql = 'select idUsuario , idProyecto, nombre, descripcion, fechaFin from pf_Recursoes where idRecurso = ?';
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
function deleteResource(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idRecurso = datos['idRecurso'];
    console.log(idRecurso);
    var sql = 'delete from pf_recursos where idRecurso = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [idRecurso], function(error, resultado) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(constantes.OK);
        }
    });
}

function listResources(pedido, respuesta) {
    var sql = 'select idRecurso, idProyecto, nombre, cantidad, descripcion, ubicacion from pf_recursos where idProyecto = ?';
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
//update<
function updateResource(pedido, respuesta) {
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idRecurso = datos['idRecurso'];
    var update = {
      idProyecto: datos['idProyecto'],
      nombre: datos['nombre'],
      cantidad: datos['cantidad'],
      descripcion: datos['descripcion'],
      ubicacion: datos['ubicacion']
    };
    var sql = 'update pf_recursos set ? where idRecurso = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [update, idRecurso], function(error, resultado) {
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
exports.getResourceById = getResourceById;
exports.saveResource = saveResource;
exports.updateResource = updateResource;
exports.listResources = listResources;
exports.deleteResource = deleteResource;
