/* global app */
//CREO MI VARIABLE APP
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('meetingsUserCtl', function($scope, meetingUserService) {
    /*Se inicializa el modelo*/
    $scope.datos = "";
    $scope.meetings = [];
    $scope.projects = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    $scope.projectsuser = [];
    $("#spn-jobs").fadeOut();
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.listProjectUser = function() {
        $scope.projectsuser = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        meetingUserService.listProjectUser($scope.idUsuario).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            alert(response.length);
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.projectsuser.push({
                        idProyecto: response[i]['idProyecto'],
                        nombre: response[i]['nombre']
                    });
                }
            } else {
                alert("no hay datos");
            }
        });
    };
    $scope.listMeetings = function(codigo) {
        $scope.meetings = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        meetingUserService.listMeetings(codigo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.meetings.push({
                        idReunion: response[i]['idReunion'],
                        nombre: response[i]['nombre'],
                        ubicacion: response[i]['ubicacion'],
                        tematica: response[i]['tematica']
                    });
                }
            } else {
                alert("no hay datos");
            }
        });
    };
    $scope.projectSelected = function(obj) {
        $scope.listMeetings(obj.idProyecto);
    };
    $scope.listProjectUser();
    $scope.getSelectedRow = function(obj) {
        $scope.datos = obj;
        $('#btn-edit').removeAttr('disabled');
    };
    // // /////////////////////////
    // // //Listar Fincas
    // // //Ordenar Campos////////////////////////////////////////
    // // $scope.ordenarPorParametro = function(tipo) {
    // //     $scope.ordenSeleccionado = tipo;
    // // };
    // //Mostrar Campos
    // $scope.getSelectedRow = function(obj) {
    //     obj.salario = parseInt(obj.salario);
    //     $scope.datos = obj;
    //     $('#btn-edit').removeAttr('disabled');
    // };
});