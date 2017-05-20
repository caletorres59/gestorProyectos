/* global app */
//CREO MI VARIABLE APP
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlTask', function($scope, taskService) {
    /*Se inicializa el modelo*/
    $scope.datos = "";
    $scope.projects = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    // $scope.fincas = [];
    $("#activities").fadeOut();
    $("#panelTask").fadeOut();
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.saveTask = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        var idActividad = $scope.activities[0].idActividad;
        if ($scope.isNullOrEmpty($scope.datos.nombreTarea) || $scope.isNullOrEmpty($scope.datos.fechaInicio) || $scope.isNullOrEmpty($scope.datos.fechaFin) || $scope.isNullOrEmpty($scope.datos.porcentajeDesarrollo)) {
            $(".alerts").html("<div class='info'><p>Check the entered data</p></div>");
        } else {
            if (form) {
                // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
                //  * el cual esta asociado a los input*/
                taskService.saveTask($scope.datos, idActividad).then(function(response) {
                    // //     /*El resultado de la promesa se recibe por parametro*/
                    // //     //alert(response.usuario + " " + response.password);
                    // //     /*Solo con limpiar el objeto se limpian todos los input 
                    // //      * asociados*/
                    if (response == "OK") {
                        $(".alerts").html("<div class='info'><p>Task is saved</p></div>");
                        $scope.listTask();
                    } else {
                        $(".alerts").html("<div class='info'><p>Task is not saved</p></div>");
                    }
                    $scope.datos = "";
                });
            } else {
                alert("Verifique los datos ingresados");
            }
        }
    };
    //modificar////////////////////////////////////////////
    $scope.update = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if ($scope.isNullOrEmpty($scope.datos.nombreTarea) || $scope.isNullOrEmpty($scope.datos.fechaInicio) || $scope.isNullOrEmpty($scope.datos.fechaFin) || $scope.isNullOrEmpty($scope.datos.porcentajeDesarrollo)) {
            $(".alerts").html("<div class='info'><p>Check the entered data</p></div>");
        } else {
            if (form) {
                // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
                //  * el cual esta asociado a los input*/
                var idActividad = $scope.activities[0].idActividad;
                taskService.update($scope.datos, idActividad).then(function(response) {
                    // //     /*El resultado de la promesa se recibe por parametro*/
                    // //     //alert(response.usuario + " " + response.password);
                    // //     /*Solo con limpiar el objeto se limpian todos los input 
                    // //      * asociados*/
                    if (response == "OK") {
                        $(".alerts").html("<div class='info'><p>Task is updated</p></div>");
                        $scope.listTask();
                    } else {
                        $(".alerts").html("<div class='info'><p>Task is not updated</p></div>");
                    }
                    $scope.datos = "";
                });
            }
        }
    };
    ///Eliminar/////////////////////////////////////////////
    $scope.deleteTask = function(codigo) {
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        //alert(codigo);
        taskService.deleteTask(codigo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response == "OK") {
                $(".alerts").html("<div class='info'><p>delete task ok</p></div>");
                $scope.listTask();
            } else {
                $(".alerts").html("<div class='info'><p>error deleting</p></div>");
            }
            $scope.datos = "";
        });
    };
    //listar//////////////////////////////////////////
    $scope.listProject = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        taskService.listProject($scope.idUsuario).then(function(response) {
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
    //Listar Actividades
    $scope.listActivities = function() {
        $scope.activities = [];
        var idProyecto = $scope.projects[0].idProyecto;
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        taskService.listActivities(idProyecto).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.activities.push({
                        idActividad: response[i]['idActividad'],
                        nombre: response[i]['nombre']
                    });
                }
            } else {
                // alert("no hay datos");
            }
        });
    };
    $scope.listTask = function() {
        $scope.task = [];
        var idProyecto = $scope.projects[0].idProyecto;
        var idActividad = $scope.activities[0].idActividad;
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        taskService.listTask(idProyecto, idActividad).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.task.push({
                        idTarea: response[i]['idTarea'],
                        nombreProyecto: response[i]['nombre'],
                        nombreActividad: response[i]['nombreActividad'],
                        nombreTarea: response[i]['nombreTarea'],
                        fechaInicio: response[i]['fechaInicio'],
                        fechaFin: response[i]['fechaFin'],
                        porcentajeDesarrollo: response[i]['porcentajeDesarrollo']
                    });
                }
            } else {
                // alert("no hay datos");
            }
        });
    };
    $scope.isNullOrEmpty = function(obj) {
        if (obj == null || obj == "") {
            return true;
        }
        return false;
    };
    $scope.getSelectedRow = function(obj) {
        // alert(obj.nombreTarea);
        var fechaInicio = $scope.formatDate(obj.fechaInicio);
        var fechaFin = $scope.formatDate(obj.fechaFin);
        obj.fechaInicio = fechaInicio;
        obj.fechaFin = fechaFin;
        obj.porcentajeDesarrollo = parseInt(obj.porcentajeDesarrollo);
        $scope.datos = obj;
        $('#btn-edit').removeAttr('disabled');
    };
    $scope.formatDate = function(fecha) {
        var fechaReplace = '' + fecha;
        var pattern = /(\d{4})(\d{2})(\d{2})/;
        var new_fecha = new Date(fechaReplace.replace(pattern, '$1-$2-$3'));
        return new_fecha;
    };
    $scope.selectProject = function(obj) {
        $scope.projects = [];
        $scope.projects.push({
            idProyecto: obj.idProyecto,
            nombre: obj.nombre
        });
        // alert(obj.idProyecto)
        //$scope.listTeam(obj.idProyecto);
        $("#activities").fadeIn("slow");
    };
    //select activitie
    $scope.selectActivity = function(obj) {
        $scope.activities = [];
        $scope.activities.push({
            idActividad: obj.idActividad,
            nombre: obj.nombre
        });
        $scope.listTask();
        $("#panelTask").fadeIn("slow");
    };
});