/* global app */
//CREO MI VARIABLE APP
var app = angular.module("appControladorRegistro", []);
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlRegistro', function($scope, registroService) {
    /*Se inicializa el modelo*/
    $scope.datos = "";
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.registrar = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if (form) {
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            registroService.registro($scope.datos).then(function(response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input 
                // //      * asociados*/
                if (response == "OK") {
                    window.location.href = "index.html";
                } else {
                    alert("El usuario no fue registrado");
                }
                $scope.datos = "";
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
});