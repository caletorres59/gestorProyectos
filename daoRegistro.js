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
function registroUsuario(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    //    var info = '';
    //    pedido.on('data', function (datosparciales) {
    //        info += datosparciales;
    //    });
    //
    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada
    var tipoDocumento = 'cc';
    var registro = {
        nombreUsuario: datos['nombreUsuario'],
        contrasena: datos['contrasena'],
        rol: datos['tipoUsuario'],
        tipoDocumento: tipoDocumento,
        numeroDocumento: datos['numeroDocumento'],
        nombres: datos['nombres'],
        apellidos: datos['apellidos'],
        email: datos['email'],
        fechaNacimiento: datos['fechaNacimiento']
    };
    console.log(registro);
    var sql = 'insert into pf_usuarios set ?';
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

function findUserByEmail(email) {
    var sql = 'select idUsuario from pf_usuarios where email = ?';
    //Se hace un insert mandado el objet
    conexion.query(sql, email, function(error, filas) {
        if (error) {
            return false;
        } else {
            var retorno = JSON.stringify(filas);
            if (retorno[0]["idUsuario"] != undefined) {
                return false;
            } else {
                return true;
            }
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
exports.registroUsuario = registroUsuario;
