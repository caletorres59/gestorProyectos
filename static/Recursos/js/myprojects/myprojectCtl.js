app.controller('myprojectsCtl', function($scope, myprojectsService) {
    /*Se inicializa el modelo*/
    $scope.myprojects = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    $scope.itemsprojects = [];
    $scope.jobs = [];
    $scope.team = [];
    $scope.task = [];
    $scope.meetings = [];
    $scope.myactivities = [];
    $scope.datos = "";
    $('#activitiesrow').fadeOut();
    $('#mytasks').fadeOut();
    $("#rowresources").fadeOut();
    //$scope.datos = "";
    $(".allitems").fadeOut();
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.listMyProject = function() {
        $scope.myprojects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        myprojectsService.listMyProject($scope.idUsuario).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.myprojects.push({
                        idProyecto: response[i]['idProyecto'],
                        nombre: response[i]['nombre'],
                        fechaInicio: response[i]['fechaInicio'],
                        fechaFin: response[i]['fechaFin'],
                        etapaProyecto: response[i]['etapaProyecto'],
                        nombres: response[i]['responsable'],
                        nombreCargo: response[i]['cargo']
                    });
                }
            } else {
                $('.alerts').html('<p>Sorry no projects are assigned</p>');
            }
        });
    };
    $scope.updateMyTask = function(obj) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        myprojectsService.updateMyTask(obj).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input
            // //      * asociados*/
            if (response == "OK") {
                $(".alerts").html("<div class='info'><p>Task is updated</p></div>");
                //$scope.listMyTask();
            } else {
                $(".alerts").html("<div class='info'><p>Task is not updated</p></div>");
            }
            $scope.datos = "";
        });
    };
    // $scope.listItemsProyect = function(codigo) {
    //     $scope.itemsprojects = [];
    //     // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //     //  * el cual esta asociado a los input*/
    //     myprojectsService.listItemsProyect(codigo).then(function(response) {
    //         // //     /*El resultado de la promesa se recibe por parametro*/
    //         // //     //alert(response.usuario + " " + response.password);
    //         // //     /*Solo con limpiar el objeto se limpian todos los input 
    //         // //      * asociados*/
    //         //alert(response.length);
    //         if (response.length > 0) {
    //             for (var i = 0; i < response.length; i++) {
    //                 $scope.itemsprojects.push({
    //                     nombreProyecto: response[i]['nombreProyecto'],
    //                     fechaInicio: response[i]['fechaInicio'],
    //                     fechaFin: response[i]['fechaFin'],
    //                     etapaProyecto: response[i]['etapaProyecto'],
    //                     representante: response[i]['representante'],
    //                     apellidos: response[i]['apellidos'],
    //                     email: response[i]['email'],
    //                 });
    //             }
    //             $(".allitems").fadeIn("slow");
    //         } else {
    //             alert("no hay datos");
    //         }
    //     });
    // };
    // $scope.listJobs = function(codigo) {
    //     $scope.jobs = [];
    //     // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //     //  * el cual esta asociado a los input*/
    //     myprojectsService.listJobs(codigo).then(function(response) {
    //         // //     /*El resultado de la promesa se recibe por parametro*/
    //         // //     //alert(response.usuario + " " + response.password);
    //         // //     /*Solo con limpiar el objeto se limpian todos los input 
    //         // //      * asociados*/
    //         if (response.length > 0) {
    //             for (var i = 0; i < response.length; i++) {
    //                 $scope.jobs.push({
    //                     idCargo: response[i]['idCargo'],
    //                     nombreCargo: response[i]['nombreCargo'],
    //                     descripcion: response[i]['descripcion'],
    //                     horario: response[i]['horario'],
    //                     salario: response[i]['salario'],
    //                     idProyecto: response[i]['idProyecto']
    //                 });
    //             }
    //         } else {
    //             alert("no hay datos");
    //         }
    //     });
    // };
    // /////////////
    $scope.listMyActivities = function(codigo) {
        $scope.myactivities = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        myprojectsService.listMyActivities(codigo, $scope.idUsuario).then(function(response) {
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.myactivities.push({
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
    // $scope.listTeam = function(idProyecto) {
    //     $scope.team = [];
    //     //alert(idProyecto);
    //     // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //     //  * el cual esta asociado a los input*/
    //     myprojectsService.listTeam(idProyecto).then(function(response) {
    //         // //     /*El resultado de la promesa se recibe por parametro*/
    //         // //     //alert(response.usuario + " " + response.password);
    //         // //     /*Solo con limpiar el objeto se limpian todos los input 
    //         // //      * asociados*/
    //         if (response.length > 0) {
    //             for (var i = 0; i < response.length; i++) {
    //                 $scope.team.push({
    //                     idProyecto: response[i]['idProyecto'],
    //                     nombre: response[i]['nombre'],
    //                     idUsuario: response[i]['idUsuario'],
    //                     nombres: response[i]['nombres'],
    //                     idCargo: response[i]['idCargo'],
    //                     nombreCargo: response[i]['nombreCargo']
    //                 });
    //             }
    //         } else {
    //             alert("no hay datos");
    //         }
    //     });
    // };
    // //task
    $scope.listMyTask = function(idActividad) {
        $scope.mytask = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        myprojectsService.listMyTask(idActividad).then(function(response) {
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
                    $scope.mytask.push({
                        idTarea: response[i]['idTarea'],
                        nombreProyecto: response[i]['nombre'],
                        idActividad: response[i]['idActividad'],
                        nombreActividad: response[i]['nombreActividad'],
                        nombreTarea: response[i]['nombreTarea'],
                        fechaInicio: response[i]['fechaInicio'],
                        fechaFin: response[i]['fechaFin'],
                        porcentajeDesarrollo: response[i]['porcentajeDesarrollo'],
                        comentario: response[i]['comentario'],
                        estado: estado
                    });
                }
            } else {
                alert("no hay datos");
            }
        });
    };
    // $scope.listMeetings = function(codigo) {
    //     $scope.meetings = [];
    //     // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
    //     //  * el cual esta asociado a los input*/
    //     myprojectsService.listMeetings(codigo).then(function(response) {
    //         // //     /*El resultado de la promesa se recibe por parametro*/
    //         // //     //alert(response.usuario + " " + response.password);
    //         // //     /*Solo con limpiar el objeto se limpian todos los input 
    //         // //      * asociados*/
    //         if (response.length > 0) {
    //             for (var i = 0; i < response.length; i++) {
    //                 $scope.meetings.push({
    //                     idReunion: response[i]['idReunion'],
    //                     nombre: response[i]['nombre'],
    //                     ubicacion: response[i]['ubicacion'],
    //                     tematica: response[i]['tematica']
    //                 });
    //             }
    //         } else {
    //             alert("no hay datos");
    //         }
    //     });
    // };
    // $scope.projectSelected = function(obj) {
    //     $scope.listItemsProyect(obj.idProyecto);
    //     $scope.listJobs(obj.idProyecto);
    //     $scope.listTeam(obj.idProyecto);
    //     $scope.listActivities(obj.idProyecto);
    //     $scope.listTask(obj.idProyecto);
    //     $scope.listMeetings(obj.idProyecto);
    // };
    // $scope.listItemsProyect(obj.idProyecto);
    //modificar////////////////////////////////////////////
    ///Eliminar/////////////////////////////////////////////
    //listar//////////////////////////////////////////
    //validate
    // $scope.listProject();
    $scope.updateTask = function(obj) {
        //alert(obj.comentarios + "asdasdas");
        //$scope.datos = obj;
        if (obj.comentarios == "" && obj.progreso == "") {
            $('.alerts').html('<p>Please enter the new progress or a new comment in order to update</p>');
        } else
        if (obj.comentarios == "" || obj.comentarios == null) {
            if (obj.progreso > obj.porcentajeDesarrollo) {
                obj.porcentajeDesarrollo = obj.progreso;
                $scope.updateMyTask(obj);
            } else {
                $('.alerts').html('<p>Please enter a higher value than the current one</p>');
            }
        } else if (obj.progreso == "" && obj.comentarios != "") {
            obj.comentario = obj.comentarios;
            $scope.updateMyTask(obj);
            obj.comentarios = "";
            obj.progreso = "";
        } else
        if (obj.comentarios != "" && progreso != null) {
            if (obj.progreso > obj.porcentajeDesarrollo) {
                obj.porcentajeDesarrollo = obj.progreso;
                obj.comentario = obj.comentarios;
                $scope.updateMyTask(obj);
                obj.comentarios = "";
                obj.progreso = "";
            } else {
                $('.alerts').html('<p>Please enter a higher value than the current one</p>');
            }
        }
        // $("#spn-jobs").fadeIn("slow");
    };
    $scope.listResources = function(idTarea) {
        $scope.myresources = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        myprojectsService.listResources(idTarea).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    $scope.myresources.push({
                        idRecurso: response[i]['idRecurso'],
                        nombre: response[i]['nombre'],
                        cantidad: response[i]['cantidad'],
                        descripcion: response[i]['descripcion'],
                        ubicacion: response[i]['ubicacion']
                    });
                }
            } else {
                alert("no hay datos");
            }
        });
    };
    $scope.selectProject = function(obj) {
        $scope.myprojects = [];
        $scope.myprojects.push({
            idProyecto: obj.idProyecto,
            nombre: obj.nombre,
            fechaInicio: obj.fechaInicio,
            fechaFin: obj.fechaFin,
            etapaProyecto: obj.etapaProyecto,
            nombres: obj.nombres,
            nombreCargo: obj.cargo
        });
        $scope.listMyActivities(obj.idProyecto);
        $("#activitiesrow").fadeIn("slow");
    };
    $scope.selectedActivity = function(obj) {
        $scope.myactivities = [];
        $scope.myactivities.push({
            idActividad: obj.idActividad,
            idUsuario: obj.idUsuario,
            nombre: obj.nombre,
            descripcion: obj.descripcion,
            fechaInicio: obj.fechaInicio,
            fechaFin: obj.fechaFin,
            idProyecto: obj.idProyecto,
            nombres: obj.nombres
        });
        $("#mytasks").fadeIn("slow");
        $("#rowresources").fadeIn("slow");
        $scope.listMyTask(obj.idActividad);
        // $("#spn-jobs").fadeIn("slow");
    };
});