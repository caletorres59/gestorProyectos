/* global app */
//CREO MI VARIABLE APP
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlResources', function($scope, resourcesService) {
    /*Se inicializa el modelo*/
    $scope.identificacion = "";
    $scope.lotes = [];
    $scope.fincas = [];
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    // $scope.guardar = function(form) {
    //     /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
    //      * promesas con el "then", que se ejecuta unicamente cuando se le retorna
    //      * un valor valido. Este se ejecuta unicamente cuando el llamado http 
    //      * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
    //      * uso de ese paradigma*/
    //     /*Si el formulario esta bien validado*/
    //     alert($scope.identificacion.selFincas);
    //     if (form) {
    //         // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //         //  * el cual esta asociado a los input*/
    //         lotesService.guardar($scope.identificacion).then(function(response) {
    //             // //     /*El resultado de la promesa se recibe por parametro*/
    //             // //     //alert(response.usuario + " " + response.password);
    //             // //     /*Solo con limpiar el objeto se limpian todos los input 
    //             // //      * asociados*/
    //             if (response == "OK") {
    //                 $('.msgServidor').html("<div id='msg' class='alert alert-success'>el lote fue registrada <span class='glyphicon glyphicon-ok'></span></div>");
    //                 setTimeout(function() {
    //                     $('#msg').attr("display", "none");
    //                 }, 5000);
    //             } else {
    //                 $('.msgServidor').html("<div id='msg' class='alert alert-danger'>Error en el registro <span class='glyphicon glyphicon-ok'></span></div>");
    //                 setTimeout(function() {
    //                     $('#msg').attr("display", "none");
    //                 }, 5000);
    //             }
    //             $scope.identificacion = "";
    //         });
    //     } else {
    //         alert("Verifique los datos ingresados");
    //     }
    //     $scope.listar();
    // };
    // //modificar////////////////////////////////////////////
    // $scope.modificar = function(form) {
    //     /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
    //      * promesas con el "then", que se ejecuta unicamente cuando se le retorna
    //      * un valor valido. Este se ejecuta unicamente cuando el llamado http 
    //      * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
    //      * uso de ese paradigma*/
    //     /*Si el formulario esta bien validado*/
    //     if (form) {
    //         // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //         //  * el cual esta asociado a los input*/
    //         lotesService.modificar($scope.identificacion).then(function(response) {
    //             // //     /*El resultado de la promesa se recibe por parametro*/
    //             // //     //alert(response.usuario + " " + response.password);
    //             // //     /*Solo con limpiar el objeto se limpian todos los input 
    //             // //      * asociados*/
    //             if (response == "OK") {
    //                 $('.msgServidor').html("<div id='msg' class='alert alert-success'>el lote fue modificada <span class='glyphicon glyphicon-ok'></span></div>");
    //                 setTimeout(function() {
    //                     $('#msg').attr("display", "none");
    //                 }, 5000);
    //                 $scope.listar();
    //             } else {
    //                 $('.msgServidor').html("<div id='msg' class='alert alert-danger'>Error al modificar <span class='glyphicon glyphicon-ok'></span></div>");
    //                 setTimeout(function() {
    //                     $('#msg').attr("display", "none");
    //                 }, 5000);
    //             }
    //             $scope.identificacion = "";
    //         });
    //     }
    // };
    // ///Eliminar/////////////////////////////////////////////
    // $scope.eliminar = function(codigo) {
    //     // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //     //  * el cual esta asociado a los input*/
    //     lotesService.eliminar(codigo).then(function(response) {
    //         // //     /*El resultado de la promesa se recibe por parametro*/
    //         // //     //alert(response.usuario + " " + response.password);
    //         // //     /*Solo con limpiar el objeto se limpian todos los input 
    //         // //      * asociados*/
    //         if (response == "OK") {
    //             $('.msgServidor').html("<div id='msg' class='alert alert-success'>el lote fue eliminada <span class='glyphicon glyphicon-ok'></span></div>");
    //             setTimeout(function() {
    //                 $('#msg').attr("display", "none");
    //             }, 5000);
    //         } else {
    //             $('.msgServidor').html("<div id='msg' class='alert alert-danger'>Error al eliminar <span class='glyphicon glyphicon-ok'></span></div>");
    //             setTimeout(function() {
    //                 $(".msgServidor").attr("display", "none");
    //             }, 5000);
    //         }
    //         $scope.identificacion = "";
    //         $scope.listar();
    //     });
    // };
    // //listar//////////////////////////////////////////
    // $scope.listar = function() {
    //     $scope.lotes = [];
    //     // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //     //  * el cual esta asociado a los input*/
    //     lotesService.listar($scope.identificacion).then(function(response) {
    //         // //     /*El resultado de la promesa se recibe por parametro*/
    //         // //     //alert(response.usuario + " " + response.password);
    //         // //     /*Solo con limpiar el objeto se limpian todos los input 
    //         // //      * asociados*/
    //         if (response.length > 0) {
    //             for (var i = 0; i < response.length; i++) {
    //                 $scope.lotes.push({
    //                     codigo: response[i].ID,
    //                     nombre: response[i].nombre,
    //                     fincas: response[i].fincas,
    //                     metros: response[i].metros,
    //                     descripcion: response[i].descripcion
    //                 });
    //             }
    //         } else {
    //             $('.msgServidor').html("<div id='msg' class='alert alert-danger'>No hay registros de fincas <span class='glyphicon glyphicon-ok'></span></div>");
    //             setTimeout(function() {
    //                 $('.msgServidor').attr("display", "none");
    //             }, 5000);
    //         }
    //     });
    // };
    // /////////////////////////
    // //Listar Fincas
    // $scope.listarFincas = function() {
    //     // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //     //  * el cual esta asociado a los input*/
    //     //  
    //     lotesService.listarFincas($scope.identificacion).then(function(response) {
    //         // //     /*El resultado de la promesa se recibe por parametro*/
    //         // //     //alert(response.usuario + " " + response.password);
    //         // //     /*Solo con limpiar el objeto se limpian todos los input 
    //         // //      * asociados*/
    //         if (response.length > 0) {
    //             for (var i = 0; i < response.length; i++) {
    //                 $scope.fincas.push({
    //                     codigo: response[i].ID,
    //                     nombre: response[i].nombre,
    //                     descripcion: response[i].descripcion,
    //                     longitud: response[i].longitud,
    //                     latitud: response[i].latitud,
    //                     hectareas: response[i].hectareas
    //                 });
    //             }
    //         } else {
    //             $('.msgServidor').html("<div id='msg' class='alert alert-danger'>No hay registros de fincas <span class='glyphicon glyphicon-ok'></span></div>");
    //             setTimeout(function() {
    //                 $('.msgServidor').attr("display", "none");
    //             }, 5000);
    //         }
    //     });
    // };
    // //Ordenar Campos////////////////////////////////////////
    // $scope.ordenarPorParametro = function(tipo) {
    //     $scope.ordenSeleccionado = tipo;
    // };
    // //Mostrar Campos
    // $scope.mostrarCampos = function(codigo) {
    //     var lotesV = $scope.lotes;
    //     var lote;
    //     angular.forEach(lotesV, function(obj) {
    //         if (obj.codigo === codigo) {
    //             lote = obj;
    //             lote.metros = parseInt(obj.metros);
    //         }
    //     });
    //     //Seteo los campos
    //     $scope.identificacion = lote;
    //     $('#btnEditar').removeAttr('disabled');
    // };
    // $scope.listar();
    // $scope.listarFincas();
});