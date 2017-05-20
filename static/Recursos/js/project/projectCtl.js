/* global app */
//CREO MI VARIABLE APP
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlProjects', function($scope, projectsService) {
    /*Se inicializa el modelo*/
    $scope.datos = "";
    $scope.projects = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.saveProject = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if ($scope.isNullOrEmpty($scope.datos.nombre) || $scope.isNullOrEmpty($scope.datos.fechaInicio) || $scope.isNullOrEmpty($scope.datos.fechaFin) || $scope.isNullOrEmpty($scope.datos.etapaProyecto)) {
            $(".alerts").html("<div class='info'><p>Check the entered data</p></div>");
        } else {
            if (form) {
                // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
                //  * el cual esta asociado a los input*/
                var idUsuario = sessionStorage.getItem("id");
                projectsService.saveProject($scope.datos, idUsuario).then(function(response) {
                    // //     /*El resultado de la promesa se recibe por parametro*/
                    // //     //alert(response.usuario + " " + response.password);
                    // //     /*Solo con limpiar el objeto se limpian todos los input 
                    // //      * asociados*/
                    if (response == "OK") {
                        $(".alerts").html("<div class='info'><p>Project is saved</p></div>");
                        $scope.listProjects();
                    } else {
                        $(".alerts").html("<div class='error'><p>Project is not saved</p></div>");
                    }
                    $scope.datos = "";
                });
            } else {
                alert("Verifique los datos ingresados");
            }
        }
        // $scope.listar();
    };
    //modificar////////////////////////////////////////////
    $scope.update = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if ($scope.isNullOrEmpty($scope.datos.nombre) || $scope.isNullOrEmpty($scope.datos.fechaInicio) || $scope.isNullOrEmpty($scope.datos.fechaFin) || $scope.isNullOrEmpty($scope.datos.etapaProyecto)) {
            $(".alerts").html("<div class='info'><p>Choose a project </p></div>");
        } else {
            if (form) {
                // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
                //  * el cual esta asociado a los input*/
                projectsService.update($scope.datos).then(function(response) {
                    // //     /*El resultado de la promesa se recibe por parametro*/
                    // //     //alert(response.usuario + " " + response.password);
                    // //     /*Solo con limpiar el objeto se limpian todos los input 
                    // //      * asociados*/
                    if (response == "OK") {
                        $(".alerts").html("<div class='info'><p>Project is updated</p></div>");
                        $scope.listProjects();
                    } else {
                        $(".alerts").html("<div class='error'><p>Project is not updated</p></div>");
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
        projectsService.delete(codigo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            //alert("controller");
            if (response == "OK") {
                $(".alerts").html("<div class='info'><p>Project is deleted</p></div>");
            } else {
                $(".alerts").html("<div class='info'><p>Project is not deleted</p></div>");
            }
            $scope.datos = "";
            $scope.listProjects();
        });
    };
    //listar//////////////////////////////////////////
    $scope.listProjects = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        projectsService.listProjects($scope.idUsuario).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.projects.push({
                        idProyecto: response[i]['idProyecto'],
                        nombre: response[i]['nombre'],
                        fechaInicio: response[i]['fechaInicio'],
                        fechaFin: response[i]['fechaFin'],
                        etapaProyecto: response[i]['etapaProyecto'],
                        idUsuario: response[i]['idUsuario']
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
    // /////////////////////////
    // //Listar Fincas
    // //Ordenar Campos////////////////////////////////////////
    // $scope.ordenarPorParametro = function(tipo) {
    //     $scope.ordenSeleccionado = tipo;
    // };
    //Mostrar Campos
    $scope.getSelectedRow = function(obj) {
        var fechaInicio = $scope.formatDate(obj.fechaInicio);
        var fechaFin = $scope.formatDate(obj.fechaFin);
        obj.fechaInicio = fechaInicio;
        obj.fechaFin = fechaFin;
        obj.etapaProyecto = parseInt(obj.etapaProyecto);
        $scope.datos = obj;
        $('#btn-edit').removeAttr('disabled');
    };
    $scope.formatDate = function(fecha) {
        var fechaReplace = '' + fecha;
        var pattern = /(\d{4})(\d{2})(\d{2})/;
        var new_fecha = new Date(fechaReplace.replace(pattern, '$1-$2-$3'));
        return new_fecha;
    };
    $scope.Progreso = function(value) {
        // var progreso = value;
        //alert(value);
    }
});