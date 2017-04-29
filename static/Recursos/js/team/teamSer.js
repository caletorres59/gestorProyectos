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
app.service('teamService', function($http, $httpParamSerializerJQLike) {
    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
    this.saveTeam = function(idProyecto, idUsuario, idCargo) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/saveTeam",
            data: $httpParamSerializerJQLike({
                idUsuario: idUsuario,
                idProyecto: idProyecto,
                idCargo: idCargo
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
    this.searchId = function(datos) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/searchId",
            data: $httpParamSerializerJQLike({
                numeroDocumento: datos.numeroDocumento
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
    this.listJobs = function() {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listJobs",
            data: $httpParamSerializerJQLike({}),
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
    this.listTeam = function(idProyecto) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listTeam",
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
    ///
    this.listProject = function() {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listProjects",
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
    //delete
    //Eliminar
    this.delete = function(idUsuario, idProyecto) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/deleteTeam",
            data: $httpParamSerializerJQLike({
                idUsuario: idUsuario,
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
            return response.data;
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
});