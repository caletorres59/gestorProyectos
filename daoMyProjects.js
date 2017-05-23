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

function listMyProjects(pedido, respuesta) {
    var datos = pedido.body;
    console.log(datos['idUsuario'] + "idU");
    var idUsuario = [datos['idUsuario']];
    var sql = 'SELECT p.idProyecto, p.nombre, p.fechaInicio, p.fechaFin, p.etapaProyecto, u.nombres as responsable, c.nombreCargo as cargo FROM  pf_proyectos p JOIN pf_integrantesProyectos ip ON ip.idProyecto = p.idProyecto JOIN pf_usuarios u ON u.idUsuario = ip.idUsuario JOIN pf_cargos c ON c.idCargo = ip.idCargo WHERE ip.idUsuario = ?';
    //Se hace un insert mandado el objet completo
    console.log("estoy en lista");
    conexion.query(sql, idUsuario, function(error, filas) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(JSON.stringify(filas));
        }
    });
}

function listMyTask(pedido, respuesta) {
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idActividad = datos['idActividad'];
    //Se hace un insert mandado el objet completo
    var sql = 'SELECT t.idTarea, t.idActividad, t.nombreTarea, t.fechaInicio, t.fechaFin, t.porcentajeDesarrollo, t.comentario FROM pf_tareas t WHERE t.idActividad = ?';
    conexion.query(sql, [idActividad], function(error, filas) {
        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {
            respuesta.send(JSON.stringify(filas));
        }
    });
}

function updateMyTask(pedido, respuesta) {
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var idTarea = [datos['idTarea']];
    console.log(idTarea + "consola update");
    var update = {
        idActividad: datos['idActividad'],
        nombreTarea: datos['nombreTarea'],
        fechaInicio: datos['fechaInicio'],
        fechaFin: datos['fechaFin'],
        porcentajeDesarrollo: datos['porcentajeDesarrollo'],
        comentario: datos['comentario']
    };
    var sql = 'update pf_tareas set ? where idTarea = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [update, idTarea], function(error, resultado) {
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
function listMyActivities(pedido, respuesta) {
    //Se hace un insert mandado el objet completo
    var datos = pedido.body;
    var idProyecto = datos['idProyecto'];
    var idUsuario = datos['idUsuario'];
    var sql = 'SELECT idActividad ,a.idUsuario,nombre,descripcion,fechaInicio,fechaFin FROM pf_actividades a JOIN pf_usuarios u ON u.idUsuario = a.idUsuario WHERE a.idUsuario = ? AND a.idProyecto = ?';
    conexion.query(sql, [idUsuario, idProyecto], function(error, filas) {
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
exports.listMyProjects = listMyProjects;
exports.updateMyTask = updateMyTask;
exports.listProjectsItems = listProjectsItems;
exports.listMyActivities = listMyActivities;
exports.listMyTask = listMyTask;