/* global app */
//CREO MI VARIABLE APP
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlJobs', function($scope, jobsService) {
    /*Se inicializa el modelo*/
    $scope.datos = "";
    $scope.jobs = [];
    $scope.projects = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    $("#spn-jobs").fadeOut();
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.saveJobs = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        var idProyecto = $scope.projects[0].idProyecto;
        if ($scope.isNullOrEmpty($scope.datos.nombreCargo) || $scope.isNullOrEmpty($scope.datos.descripcion) || $scope.isNullOrEmpty($scope.datos.horario) || $scope.isNullOrEmpty($scope.datos.salario)) {
            $(".alerts").html("<div class='info'><p>Check the entered data</p></div>");
        } else {
            if (form) {
                // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
                //  * el cual esta asociado a los input*/
                jobsService.saveJobs($scope.datos, idProyecto).then(function(response) {
                    // //     /*El resultado de la promesa se recibe por parametro*/
                    // //     //alert(response.usuario + " " + response.password);
                    // //     /*Solo con limpiar el objeto se limpian todos los input 
                    // //      * asociados*/
                    if (response == "OK") {
                        $(".alerts").html("<div class='info'><p>Job is saved</p></div>");
                        $scope.listJobs(idProyecto);
                    } else {
                        $(".alerts").html("<div class='info'><p>Job is not saved</p></div>");
                    }
                    $scope.datos = "";
                });
            } else {
                alert("Verifique los datos ingresados");
            }
        }
        // $scope.listar();
    };
    $scope.listProject = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        jobsService.listProject($scope.idUsuario).then(function(response) {
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
                alert("no hay datos");
            }
        });
    };
    //modificar////////////////////////////////////////////
    $scope.update = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if ($scope.isNullOrEmpty($scope.datos.nombreCargo) || $scope.isNullOrEmpty($scope.datos.descripcion) || $scope.isNullOrEmpty($scope.datos.horario) || $scope.isNullOrEmpty($scope.datos.salario)) {
            $(".alerts").html("<div class='info'><p>Selected a job</p></div>");
        } else {
            if (form) {
                // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
                //  * el cual esta asociado a los input*/
                jobsService.update($scope.datos).then(function(response) {
                    // //     /*El resultado de la promesa se recibe por parametro*/
                    // //     //alert(response.usuario + " " + response.password);
                    // //     /*Solo con limpiar el objeto se limpian todos los input 
                    // //      * asociados*/
                    if (response == "OK") {
                        $(".alerts").html("<div class='info'><p>Job is updated</p></div>");
                        $scope.listJobs(idProyecto);
                    } else {
                        $(".alerts").html("<div class='info'><p>Job is not upadated</p></div>");
                    }
                    $scope.datos = "";
                });
            }
        }
    };
    ///Eliminar/////////////////////////////////////////////
    $scope.delete = function(codigo) {
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        jobsService.delete(codigo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response == "OK") {
                $(".alerts").html("<div class='info'><p>delete job ok</p></div>");
            } else {
                $(".alerts").html("<div class='info'><p>error delete</p></div>");
            }
            $scope.datos = "";
            $scope.listJobs();
        });
    };
    //listar//////////////////////////////////////////
    $scope.listJobs = function(codigo) {
        $scope.jobs = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        jobsService.listJobs(codigo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.jobs.push({
                        idCargo: response[i]['idCargo'],
                        nombreCargo: response[i]['nombreCargo'],
                        descripcion: response[i]['descripcion'],
                        horario: response[i]['horario'],
                        salario: response[i]['salario'],
                        idProyecto: response[i]['idProyecto']
                    });
                }
            } else {
                alert("no hay datos");
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
        alert(obj.idProyecto)
        $scope.listJobs(obj.idProyecto);
        $("#spn-jobs").fadeIn("slow");
    };
    // /////////////////////////
    // //Listar Fincas
    // //Ordenar Campos////////////////////////////////////////
    // $scope.ordenarPorParametro = function(tipo) {
    //     $scope.ordenSeleccionado = tipo;
    // };
    //Mostrar Campos
    $scope.getSelectedRow = function(obj) {
        obj.salario = parseInt(obj.salario);
        $scope.datos = obj;
        $('#btn-edit').removeAttr('disabled');
    };
});