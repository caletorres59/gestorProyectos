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
function saveMeeting(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //    
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var registro = {
        idProyecto: datos['idProyecto'],
        ubicacion: datos['ubicacion'],
        tematica: datos['tematica']
    };
    var sql = 'insert into pf_reuniones set ?';
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
function deleteMeeting(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //    
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idReunion = [datos['idReunion']];
    var sql = 'delete from pf_reuniones where idReunion = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, idReunion, function(error, resultado) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(constantes.OK);
        }
    });
}

function listMeetings(pedido, respuesta) {
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idProyecto = [datos['idProyecto']];
    var sql = 'select r.idReunion, p.nombre, r.ubicacion, r.tematica from pf_reuniones r join pf_proyectos p on p.idProyecto = r.idProyecto where r.idProyecto = ?';
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

function updateMeeting(pedido, respuesta) {
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idReunion = [datos['idReunion']];
    var update = {
        idReunion: datos['idReunion'],
        idProyecto: datos['idProyecto'],
        ubicacion: datos['ubicacion'],
        tematica: datos['tematica']
    };
    var sql = 'update pf_reuniones set ? where idReunion = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [update, idReunion], function(error, resultado) {
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
exports.saveMeeting = saveMeeting;
exports.listMeetings = listMeetings;
exports.deleteMeeting = deleteMeeting;
exports.updateMeeting = updateMeeting;