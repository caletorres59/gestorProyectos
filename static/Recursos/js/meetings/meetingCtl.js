/* global app */
//CREO MI VARIABLE APP
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlMeetings', function($scope, meetingService) {
    /*Se inicializa el modelo*/
    $scope.datos = "";
    $scope.meetings = [];
    $scope.projects = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    $("#spn-jobs").fadeOut();
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.saveMeeting = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        var idProyecto = $scope.projects[0].idProyecto;
        if ($scope.isNullOrEmpty($scope.datos.ubicacion) || $scope.isNullOrEmpty($scope.datos.tematica)) {
            $(".alerts").html("<div class='info'><p>Check the entered data</p></div>");
        } else {
            if (form) {
                // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
                //  * el cual esta asociado a los input*/
                meetingService.saveMeeting($scope.datos, idProyecto).then(function(response) {
                    // //     /*El resultado de la promesa se recibe por parametro*/
                    // //     //alert(response.usuario + " " + response.password);
                    // //     /*Solo con limpiar el objeto se limpian todos los input 
                    // //      * asociados*/
                    if (response == "OK") {
                        $(".alerts").html("<div class='info'><p>Meeting is saved</p></div>");
                        $scope.listMeetings(idProyecto);
                    } else {
                        $(".alerts").html("<div class='info'><p>Meeting is not saved</p></div>");
                    }
                    $scope.datos = "";
                });
            } else {
                //alert("Verifique los datos ingresados");
            }
        }
        // $scope.listar();
    };
    $scope.listProject = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        meetingService.listProject($scope.idUsuario).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.projects.push({
                        idProyecto: response[i]['idProyecto'],
                        nombre: response[i]['nombre']
                    });
                }
            } else {
                //alert("no hay datos");
            }
        });
    };
    // //modificar////////////////////////////////////////////
    $scope.update = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if ($scope.isNullOrEmpty($scope.datos.ubicacion) || $scope.isNullOrEmpty($scope.datos.tematica)) {
            $(".alerts").html("<div class='info'><p>Selected a Meeting</p></div>");
        } else {
            if (form) {
                // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
                //  * el cual esta asociado a los input*/
                var idProyecto = $scope.projects[0].idProyecto;
                meetingService.update($scope.datos, idProyecto).then(function(response) {
                    // //     /*El resultado de la promesa se recibe por parametro*/
                    // //     //alert(response.usuario + " " + response.password);
                    // //     /*Solo con limpiar el objeto se limpian todos los input 
                    // //      * asociados*/
                    if (response == "OK") {
                        $(".alerts").html("<div class='info'><p>Meeting is updated</p></div>");
                        $scope.listJobs(idProyecto);
                    } else {
                        $(".alerts").html("<div class='info'><p>Meeting is not upadated</p></div>");
                    }
                    $scope.datos = "";
                });
            }
        }
    };
    // ///Eliminar/////////////////////////////////////////////
    $scope.delete = function(codigo) {
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        meetingService.delete(codigo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response == "OK") {
                $(".alerts").html("<div class='info'><p>delete meeting ok</p></div>");
            } else {
                $(".alerts").html("<div class='info'><p>error delete</p></div>");
            }
            $scope.datos = "";
            $scope.listMeetings();
        });
    };
    // //listar//////////////////////////////////////////
    $scope.listMeetings = function(codigo) {
        $scope.meetings = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        meetingService.listMeetings(codigo).then(function(response) {
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
                //alert("no hay datos");
            }
        });
    };
    //validate
    $scope.isNullOrEmpty = function(obj) {
        if (obj == null || obj == "") {
            return true;
        }
        return false;
    };
    $scope.selectProject = function(obj) {
        $scope.projects = [];
        $scope.projects.push({
            idProyecto: obj.idProyecto,
            nombre: obj.nombre
        });
        $scope.listMeetings(obj.idProyecto);
        $("#spn-jobs").fadeIn("slow");
        $("#mesaggereporter").fadeOut();
    };
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