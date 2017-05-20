"use strict";
/*El use strict hace que se deba codificar de manera correcta, siendo estricto
 * a la hora de compilar el codigo ejemplo: 
 * x = 3.14; // This will cause an error (x is not defined)*/
/* global app */
/*************servicio vs factory vs provider***************/
/*Todas son SINGLETON (Unicamente puede ser instanciada una vez en el contexto
 * en el cual se encuentre)*/
/*Se define el servicio (app.service(nombre servicio, funcionalidad))*/
/*El $http es un servicio por defecto para consumir GET,POST,ETC. El 
 * $httpParamSerializerJQLike es necesario, debido a que angular empaqueta los
 * datos diferente a como se hacia en jquery  y muchos webservices no encuentran
 * los datos que les llega, por lo que se hace necesario serializarlos como 
 * jquery para que lleguen al servidor*/
app.service('taskService', function($http, $httpParamSerializerJQLike) {
    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
    this.listProject = function(idUsuario) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listProjects",
            data: $httpParamSerializerJQLike({
                idUsuario: idUsuario
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
    // list Activities
    this.listActivities = function(idProyecto) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listActivities",
            data: $httpParamSerializerJQLike({
                idProyecto: idProyecto
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
    //Save task
    this.saveTask = function(datos, idActividad) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/saveTask",
            data: $httpParamSerializerJQLike({
                idActividad: idActividad,
                nombreTarea: datos['nombreTarea'],
                fechaInicio: datos['fechaInicio'],
                fechaFin: datos['fechaFin'],
                porcentajeDesarrollo: datos['porcentajeDesarrollo']
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
    //Eliminar
    this.deleteTask = function(codigo) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        alert(codigo);
        alert("estoy en el servicio de eliminar las tareas");
        var promise = $http({
            method: "post",
            url: "/deleteTask",
            data: $httpParamSerializerJQLike({
                idTarea: codigo
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            return response.data;
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
    //Modificar
    this.update = function(datos, idActividad) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/updateTask",
            data: $httpParamSerializerJQLike({
                idTarea: datos['idTarea'],
                idActividad: idActividad,
                nombreTarea: datos['nombreTarea'],
                fechaInicio: datos['fechaInicio'],
                fechaFin: datos['fechaFin'],
                porcentajeDesarrollo: datos['porcentajeDesarrollo']
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
    //Listar
    this.listTask = function(idProyecto, idActividad) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        alert("listar tareas");
        var promise = $http({
            method: "post",
            url: "/listTask",
            data: $httpParamSerializerJQLike({
                idProyecto: idProyecto,
                idActividad: idActividad
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
    ///
    this.listarFincas = function(identificacion) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listarFincas",
            data: $httpParamSerializerJQLike({}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
});