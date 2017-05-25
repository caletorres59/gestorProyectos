app.controller('statusUserCtl', function($scope, statusUserService) {
    /*Se inicializa el modelo*/
    $scope.projectsuser = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    $scope.itemsprojects = [];
    $scope.jobs = [];
    $scope.team = [];
    $scope.task = [];
    $scope.meetings = [];
    $(".allitems").fadeOut();
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.listProjectUser = function() {
        $scope.projectsuser = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        statusUserService.listProjectUser($scope.idUsuario).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
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
    $scope.listProjectUser();
    $scope.listItemsProyect = function(codigo) {
        $scope.itemsprojects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        statusUserService.listItemsProyect(codigo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            //alert(response.length);
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.itemsprojects.push({
                        nombreProyecto: response[i]['nombreProyecto'],
                        fechaInicio: response[i]['fechaInicio'],
                        fechaFin: response[i]['fechaFin'],
                        etapaProyecto: response[i]['etapaProyecto'],
                        representante: response[i]['representante'],
                        apellidos: response[i]['apellidos'],
                        email: response[i]['email'],
                    });
                }
                $(".allitems").fadeIn("slow");
            } else {
                alert("no hay datos");
            }
        });
    };
    $scope.listJobs = function(codigo) {
        $scope.jobs = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        statusUserService.listJobs(codigo).then(function(response) {
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
    /////////////
    $scope.listActivities = function(codigo) {
        $scope.activities = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        statusUserService.listActivities(codigo).then(function(response) {
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.activities.push({
                        idActividad: response[i].idActividad,
                        idUsuario: response[i].idUsuario,
                        nombre: response[i].nombre,
                        descripcion: response[i].descripcion,
                        fechaInicio: response[i].fechaInicio,
                        fechaFin: response[i].fechaFin,
                        idProyecto: response[i].idProyecto,
                        nombres: response[i].nombres
                    });
                }
            } else {
                alert("no hay datos");
            }
        });
    };
    $scope.listTeam = function(idProyecto) {
        $scope.team = [];
        //alert(idProyecto);
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        statusUserService.listTeam(idProyecto).then(function(response) {
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
                alert("no hay datos");
            }
        });
    };
    //task
    $scope.listTask = function(idProyecto) {
        $scope.task = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        statusUserService.listTask(idProyecto).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    var fechaFinal = new Date(response[i]['fechaFin']);
                    var fechaInicio = new Date();
                    var porcentajeDesarrollo = response[i]['porcentajeDesarrollo'];
                    var estado = 'OK';
                    if (fechaFinal < fechaInicio && parseInt(porcentajeDesarrollo) < 100) {
                        estado = 'Delayed';
                    }
                    $scope.task.push({
                        idTarea: response[i]['idTarea'],
                        nombreProyecto: response[i]['nombre'],
                        nombreActividad: response[i]['nombreActividad'],
                        nombreTarea: response[i]['nombreTarea'],
                        fechaInicio: response[i]['fechaInicio'],
                        fechaFin: response[i]['fechaFin'],
                        porcentajeDesarrollo: response[i]['porcentajeDesarrollo'],
                        estado: estado
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
        statusUserService.listMeetings(codigo).then(function(response) {
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
        $scope.listItemsProyect(obj.idProyecto);
        $scope.listJobs(obj.idProyecto);
        $scope.listTeam(obj.idProyecto);
        $scope.listActivities(obj.idProyecto);
        $scope.listTask(obj.idProyecto);
        $scope.listMeetings(obj.idProyecto);
    };
    // $scope.listItemsProyect(obj.idProyecto);
    //modificar////////////////////////////////////////////
    ///Eliminar/////////////////////////////////////////////
    //listar//////////////////////////////////////////
    //validate
    // $scope.listProject();
});