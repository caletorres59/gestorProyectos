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
app.service('myprojectsService', function($http, $httpParamSerializerJQLike) {
    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
    this.listMyProject = function(codigo) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listMyProjects",
            data: $httpParamSerializerJQLike({
                idUsuario: codigo
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            return response.data;
        });
        /*Luego se retorna la promesa*/
        return promise;
    };
    //items
    // this.listItemsProyect = function(codigo) {
    //     /*El resultado del $http es almacenado en la promesa*/
    //     /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
    //     var promise = $http({
    //         method: "post",
    //         url: "/listProjectsItems",
    //         data: $httpParamSerializerJQLike({
    //             idProyecto: codigo
    //         }),
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }).then(function mySucces(response) {
    //         /*Todos los datos se almacenan en .data*/
    //         return response.data;
    //     }, function myError(response) {
    //         alert("Error");
    //     });
    //     /*Luego se retorna la promesa*/
    //     return promise;
    // };
    this.listMyTask = function(idActividad) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listMyTask",
            data: $httpParamSerializerJQLike({
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
    this.listMyActivities = function(codigo, idUsuario) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listMyActivities",
            data: $httpParamSerializerJQLike({
                idProyecto: codigo,
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
    this.updateMyTask = function(datos) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/updateMyTask",
            data: $httpParamSerializerJQLike({
                idTarea: datos.idTarea,
                idActividad: datos.idActividad,
                nombreTarea: datosnombreTarea,
                fechaInicio: datosfechaInicio,
                fechaFin: datosfechaFin,
                porcentajeDesarrollo: datos.porcentajeDesarrollo,
                comentarios: datos.comentario
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
    // this.listMeetings = function(codigo) {
    //     /*El resultado del $http es almacenado en la promesa*/
    //     /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
    //     var promise = $http({
    //         method: "post",
    //         url: "/listMeetings",
    //         data: $httpParamSerializerJQLike({
    //             idProyecto: codigo
    //         }),
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }).then(function mySucces(response) {
    //         /*Todos los datos se almacenan en .data*/
    //         return response.data;
    //     }, function myError(response) {
    //         alert("Error");
    //     });
    //     /*Luego se retorna la promesa*/
    //     return promise;
    // };
    // this.listTeam = function(idProyecto) {
    //     /*El resultado del $http es almacenado en la promesa*/
    //     /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
    //     var promise = $http({
    //         method: "post",
    //         url: "/listTeam",
    //         data: $httpParamSerializerJQLike({
    //             idProyecto: idProyecto
    //         }),
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }).then(function mySucces(response) {
    //         /*Todos los datos se almacenan en .data*/
    //         return response.data;
    //     }, function myError(response) {
    //         alert("Error");
    //     });
    //     /*Luego se retorna la promesa*/
    //     return promise;
    // };
    // this.listJobs = function(codigo) {
    //     /*El resultado del $http es almacenado en la promesa*/
    //     /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
    //     var promise = $http({
    //         method: "post",
    //         url: "/listJobs",
    //         data: $httpParamSerializerJQLike({
    //             idProyecto: codigo
    //         }),
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }).then(function mySucces(response) {
    //         /*Todos los datos se almacenan en .data*/
    //         return response.data;
    //     }, function myError(response) {
    //         alert("Error");
    //     });
    //     /*Luego se retorna la promesa*/
    //     return promise;
    // };
});