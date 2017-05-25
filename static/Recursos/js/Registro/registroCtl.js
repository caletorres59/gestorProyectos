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
    $scope.tipoUsuario ="";
    $scope.userTypes =
      [
        {
          "nombre":"Integrante",
          "value":"user"
        },{
          "nombre":"Gerente",
          "value":"admin"
        }
      ]
    ;

    $scope.setUserType=function(obj){
      $scope.tipoUsuario = obj.value;
    }
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.registrar = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if($scope.isNullOrEmpty($scope.datos.nombreUsuario)||$scope.isNullOrEmpty($scope.datos.contrasena)||$scope.isNullOrEmpty($scope.datos.numeroDocumento)
      ||$scope.isNullOrEmpty($scope.datos.nombres)|| $scope.isNullOrEmpty($scope.datos.apellidos) || $scope.isNullOrEmpty($scope.datos.email)
    ||$scope.isNullOrEmpty($scope.datos.fechaNacimiento)||$scope.isNullOrEmpty($scope.datos.tipoUsuario)){
      $(".alerts").html("<div class='error'><p>Check the entered data</p></div>");
    }else{
      if($scope.datos.confirmarContrasena != $scope.datos.contrasena){
        $(".alerts").html("<div class='error'><p>Password and confirm Password are not equal</p></div>");
      }else{
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
                  $(".alerts").html("<div class='info'><p>User saved correctly</p></div>");
              } else {
                $(".alerts").html("<div class='error'><p>The user was not saved</p></div>");
              }
              $scope.datos = "";
          });
      } else {
          alert("Verifique los datos ingresados");
      }
    }
    }

    };
    $scope.isNullOrEmpty = function(obj) {
        if (obj == null || obj == "") {
            return true;
        }
        return false;
    };
});
