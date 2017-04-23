/* global app */
//CREO MI VARIABLE APP
var app = angular.module("appControladorLogin", []);
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlLogin', function($scope, $window, loginService) {
    /*Se inicializa el modelo*/
    $scope.datos = "";
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.login = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if (form) {
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            loginService.login($scope.datos).then(function(response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input 
                // //      * asociados*/
                //valido si hay datos
                if (response.length > 0) {
                    sessionStorage.setItem("id", response[0].idUsuario);
                    sessionStorage.setItem("username", response[0].nombreUsuario);
                    sessionStorage.setItem("role", response[0].rol);
                    sessionStorage.setItem("identification", response[0].numeroDocumento);
                    sessionStorage.setItem("nombres", response[0].numeroDocumento);
                    if (response[0].rol == 'admin') {
                        // /*Redirecciona la pagina*/
                        $window.location.href = "masterAdmin.html";
                    } else {
                        $window.location.href = "masterUsers.html";
                    }
                } else {
                    alert("no existe el usuario registrese");
                }
                // if (response == "OK") {
                //     window.location.href = "index.html";
                // } else {
                //     alert("El usuario no fue registrado");
                // }
                $scope.datos = "";
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
});