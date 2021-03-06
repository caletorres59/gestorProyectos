/*Modulo que me permite tener conexiones web*/
var http = require('http');
/*Modulo que me permite manipular infomracion de la URL de entrada*/
var url = require('url');
/*Modulo que me permite leer archivos*/
var fs = require('fs');
/*Variable que gestionara el servidor*/
var servidor;
/*Variabel que gestionara la conexion de la base de datos*/
var conexion;
//Con la libreria cargada, se tiene accceso a todos los tipos posibles de MIME,
//y no solo a los 6 que se habian especificado
var mime = require('mime');
var formidable = require('formidable');
var express = require('express');
var server;
/*Con el ./ se indica que el archivo que se va a necesitar se encuentra en la
 * misma carpeta, ademas cuando no se coloca esto NODE busca en su nucleo dicho
 * repositorio */
var daoRegistro = require('./daoRegistro');
var daoLogin = require('./daoLogin');
var daoProjects = require('./daoProjects');
var daoJobs = require('./daoJobs');
var daoTeam = require('./daoTeam');
var daoActivity = require('./daoActivity');
var daoTasks = require('./daoTasks');
var daoStatus = require('./daoStatus');
var daoMeetings = require('./daoMeetings');
var daoResources = require('./daoResources');
var daoStatusUser = require('./daoStatusUser');
// integrante
var daoMyProjects = require('./daoMyProjects');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

function configurarServidor() {
    daoRegistro.conectardb();
    daoLogin.conectardb();
    daoProjects.conectardb();
    daoJobs.conectardb();
    daoTeam.conectardb();
    daoActivity.conectardb();
    daoTasks.conectardb();
    daoStatus.conectardb();
    daoMeetings.conectardb();
    daoResources.conectardb();
    daoMyProjects.conectardb();
    daoStatusUser.conectardb();
    app.use(express.static(__dirname + '/static'));
    server = app.listen(8888, function() {
        console.log('Servidor web iniciado');
    });
}
//Registro
app.post('/registroUsuario', daoRegistro.registroUsuario);
//Login
app.post('/login', daoLogin.login);
// //
// Projects
app.post('/save_project', daoProjects.save_project);
app.post('/listProjects', daoProjects.listProjects);
app.post('/deleteProject', daoProjects.deleteProject);
app.post('/updateProject', daoProjects.updateProjects);
app.post('/listUsersByProject', daoProjects.listUsersByProject);
// //////
//Jobs
app.post('/saveJobs', daoJobs.saveJobs);
app.post('/listJobs', daoJobs.listJobs);
app.post('/deleteJobs', daoJobs.deleteJobs);
app.post('/updateJobs', daoJobs.updateJobs);
/////////
//Team
app.post('/searchId', daoTeam.searchId);
app.post('/saveTeam', daoTeam.saveTeam);
app.post('/listTeam', daoTeam.listTeam);
app.post('/deleteTeam', daoTeam.deleteTeam);
//Task
app.post('/saveTask', daoTasks.saveTask);
app.post('/listTask', daoTasks.listTask);
app.post('/deleteTask', daoTasks.deleteTask);
app.post('/updateTask', daoTasks.updateTask);
app.post('/assignResources', daoTasks.assignResources);
app.post('/getResources', daoTasks.getResources);
//team
app.post('/listTeam', daoTeam.listTeam);
app.post('/deleteTeam', daoTeam.deleteTeam);
app.post('/saveActivity', daoActivity.saveActivity);
app.post('/updateActivity', daoActivity.updateActivity);
app.post('/listActivities', daoActivity.listActivities);
app.post('/listActivitiesByProject', daoActivity.listActivitiesByProject);
app.post('/getActivityById', daoActivity.getActivityById);
app.post('/deleteActivity', daoActivity.deleteActivity);
//Status
app.post('/listProjectsItems', daoStatus.listProjectsItems);
app.post('/listActivities2', daoStatus.listActivities);
app.post('/listTask2', daoStatus.listTask2);
//Meetings
app.post('/listMeetings', daoMeetings.listMeetings);
app.post('/deleteMeeting', daoMeetings.deleteMeeting);
app.post('/saveMeeting', daoMeetings.saveMeeting);
app.post('/updateMeeting', daoMeetings.updateMeeting);
app.post('/saveResource', daoResources.saveResource);
app.post('/listResources', daoResources.listResources);
app.post('/updateResource', daoResources.updateResource);
app.post('/deleteResource', daoResources.deleteResource);
//myProjects
app.post('/listMyProjects', daoMyProjects.listMyProjects);
app.post('/listMyActivities', daoMyProjects.listMyActivities);
app.post('/listMyTask', daoMyProjects.listMyTask);
app.post('/updateMyTask', daoMyProjects.updateMyTask);
app.post('/listResources2', daoMyProjects.listResources);
//Status User
app.post('/listProjectUser', daoStatusUser.listProjectUser);
// app.post('/updateJobs', daoJobs.updateJobs);
// app.post('/crearVacas', daoVacas.crearVacas);
// app.post('/listarVacas', daoVacas.listarVacas);
// app.post('/eliminarVacas', daoVacas.eliminarVacas);
// app.post('/updateVacas', daoVacas.updateVacas);
//Tipo cerveza
// app.post('/crearTipoCerveza', daoTipoCerveza.crearTipoCerveza);
// app.post('/listarTiposCerveza', daoTipoCerveza.listarTiposCerveza);
// app.post('/updateCervezas', daoTipoCerveza.updateCervezas);
// app.post('/eliminarTipoCerveza', daoTipoCerveza.eliminarTipoCerveza);
//servidor = http.createServer(function (entrada, respuesta) {
//
//        var ruta = definirRuta(entrada);
//
//        switch (ruta) {
//            case 'static/crearTipoCerveza':
//            {
//                //Si se da en crear tabla
//                daoTipoCerveza.crearTipoCerveza(entrada, respuesta);
//                break;
//            }
//            case 'static/listarTiposCerveza':
//            {
//                daoTipoCerveza.listarTiposCerveza(respuesta);
//                break;
//            }
//            case 'static/eliminarTipoCerveza':
//            {
//                daoTipoCerveza.eliminarTipoCerveza(entrada, respuesta);
//                break;
//            }
//            case 'static/updateCervezas':
//            {
//                daoTipoCerveza.updateCervezas(entrada, respuesta);
//                break;
//            }
//
//            case 'static/listarPresentaciones':
//            {
//                daoPresentacion.listarPresentaciones(respuesta);
//                break;
//            }
//            case 'static/crearPresentacion':
//            {
//                daoPresentacion.crearPresentacion(entrada, respuesta);
//                break;
//            }
//
//            case 'static/updatePresentacion':
//            {
//                daoPresentacion.updatePresentacion(entrada, respuesta);
//                break;
//            }
//            case 'static/guardarProduccion':
//            {
//                daoProduccion.crearProduccion(entrada, respuesta);
//                break;
//            }
//            case 'static/listarProducciones':
//            {
//                daoProduccion.listarProducciones(respuesta);
//                break;
//            }
//            case 'static/eliminarProduccion':
//            {
//                daoProduccion.eliminarProduccion(entrada, respuesta);
//                break;
//            }
//            case 'static/eliminarPresentacion':
//            {
//                daoPresentacion.eliminarPresentacion(entrada, respuesta);
//                break;
//            }
//            case 'static/updateProduccion':
//            {
//                daoProduccion.updateProduccion(entrada, respuesta);
//                break;
//            }
//            case 'static/subirArchivo':
//            {
//                subirArchivo(entrada, respuesta);
//                break;
//            }
//            default:
//            {
//                //Validamos si la pagina solicitada existe
//                fs.exists(ruta, function (existe) {
//                    //Si la encontro
//                    if (existe) {
//                        cargarPagina(ruta, respuesta);
//                    }
//                    //Si no existe respondemos error 404
//                    else {
//                        mostrarError(respuesta);
//                    }
//                });
//            }
//        }
//    });
function iniciarServidor() {
    servidor.listen(8888);
    console.log('Servidor web iniciado');
}

function definirRuta(entrada) {
    //Se obtiene la URL
    var objetourl = url.parse(entrada.url);
    //Se concatena el nombre de la carpeta static con la pagina solicitada
    var ruta = 'static' + objetourl.pathname;
    //Si no solicitaron ninguna pagina en especial?
    if (ruta === 'static/') {
        ruta = 'static/index.html';
    }
    return ruta;
}

function subirArchivo(pedido, respuesta) {
    var entrada = new formidable.IncomingForm();
    entrada.uploadDir = 'upload';
    entrada.parse(pedido);
    entrada.on('fileBegin', function(field, file) {
        file.path = "./static/Recursos/img/descarga.jfif";
    });
    entrada.on('end', function() {
        respuesta.writeHead(301, {
            Location: 'http://localhost:8888/'
        });
        respuesta.end();
    });
}

function cargarPagina(ruta, respuesta) {
    //Lea el archivo index
    fs.readFile(ruta, function(error, contenidoArchivo) {
        //Si sucede un error leyendo el archivo, muestre error 500
        if (error) {
            respuesta.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            respuesta.write('Error interno');
            respuesta.end();
        } else {
            /*Tambien cambia la forma de determinar el tipo de MIME, por esta*/
            /*Se obtienen todos los tipos de dato que se esten tratando
             * de cargar en el html*/
            var tipo = mime.lookup(ruta);
            /*Los muestro por consola*/
            console.log(tipo);
            /*Respondo*/
            respuesta.writeHead(200, {
                'Content-Type': tipo
            });
            respuesta.write(contenidoArchivo);
            respuesta.end();
        }
    });
}

function mostrarError(respuesta) {
    respuesta.writeHead(404, {
        'Content-Type': 'text/html'
    });
    respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
    respuesta.end();
}
//Habilita a las funciones para que sean llamadas o exportadas desde otros archivos
exports.configurarServidor = configurarServidor;
exports.iniciarServidor = iniciarServidor;