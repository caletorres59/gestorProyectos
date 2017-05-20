/* global app */
//CREO MI VARIABLE APP
/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlTeam', function($scope, teamService) {
    /*Se inicializa el modelo*/
    $scope.datos = "";
    $scope.projects = [];
    $scope.jobs = [];
    $scope.person = [];
    $scope.team = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    $("#srch-term").fadeOut();
    $("#spn-jobs").fadeOut();
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.saveTeam = function() {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        var idProyecto = $scope.projects[0].idProyecto;
        var idUsuario = $scope.person[0].idUsuario;
        var idCargo = $scope.jobs[0].idCargo;
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        teamService.saveTeam(idProyecto, idUsuario, idCargo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response == "OK") {
                $(".alerts").html("<div class='info'><p>The member was assigned</p></div>");
            } else {
                $(".alerts").html("<div class='info'><p>The member was not assigned</p></div>");
            }
            $scope.datos = "";
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
        if (form) {
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            teamService.update($scope.datos).then(function(response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input 
                // //      * asociados*/
                if (response == "OK") {
                    $(".alerts").html("<div class='info'><p>The member was updated</p></div>");
                } else {
                    $(".alerts").html("<div class='info'><p>The member was not updated</p></div>");
                }
                $scope.datos = "";
            });
        }
    };
    ////SearchId
    $scope.searchId = function(form) {
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        //alert("busco usuario");
        teamService.searchId($scope.datos).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            // var object;
            // object = response;
            $scope.person.push({
                idUsuario: response[0]['idUsuario'],
                nombreUsuario: response[0]['nombreUsuario'],
                nombres: response[0]['nombres'],
                apellidos: response[0]['apellidos']
            });
            $('#spn-jobs').fadeIn(3000);
        });
    };
    ///Eliminar/////////////////////////////////////////////
    $scope.delete = function(idUsuario, idProyecto) {
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        //alert(idUsuario);
        // alert(idProyecto);
        teamService.delete(idUsuario, idProyecto).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            //alert("controller");
            if (response == "OK") {
                $(".alerts").html("<div class='info'><p>The member was updated</p></div>");
            } else {
                $(".alerts").html("<div class='info'><p>The member not deleted</p></div>");
            }
            $scope.datos = "";
            // $scope.listJobs();
        });
    };
    //listar//////////////////////////////////////////
    $scope.listProject = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        teamService.listProject($scope.idUsuario).then(function(response) {
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
    //List Jobs
    $scope.listJobs = function() {
        $scope.jobs = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        var idProyecto = $scope.projects[0].idProyecto;
        teamService.listJobs(idProyecto).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.jobs.push({
                        idCargo: response[i]['idCargo'],
                        nombreCargo: response[i]['nombreCargo']
                    });
                }
            } else {
                // alert("no hay datos");
            }
        });
    };
    //Lista de integrante
    $scope.listTeam = function(idProyecto) {
        $scope.team = [];
        //alert(idProyecto);
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        teamService.listTeam(idProyecto).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.team.push({
                        idProyecto: response[i]['idProyecto'],
                        nombre: response[i]['nombre'],
                        idUsuario: response[i]['idUsuario'],
                        nombres: response[i]['nombres'],
                        idCargo: response[i]['idCargo'],
                        nombreCargo: response[i]['nombreCargo']
                    });
                }
            } else {
                // alert("no hay datos");
            }
        });
    };
    $scope.selectProject = function(obj) {
        $scope.projects = [];
        $scope.projects.push({
            idProyecto: obj.idProyecto,
            nombre: obj.nombre
        });
        // alert(obj.idProyecto)
        $scope.listTeam(obj.idProyecto);
        $("#srch-term").fadeIn("slow");
    };
    $scope.selectJob = function(obj) {
        $scope.jobs = [];
        $scope.jobs.push({
            idCargo: obj.idCargo,
            nombreCargo: obj.nombreCargo
        });
    };
    // /////////////////////////
    // //Listar Fincas
    // //Ordenar Campos////////////////////////////////////////
    // $scope.ordenarPorParametro = function(tipo) {
    //     $scope.ordenSeleccionado = tipo;
    // };
    //Mostrar Campos
    // $scope.getSelectedRow = function(obj) {
    //     obj.salario = parseInt(obj.salario);
    //     $scope.datos = obj;
    //     $('#btn-edit').removeAttr('disabled');
    // };
});