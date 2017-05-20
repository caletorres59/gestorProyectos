/* global app */
//CREO MI VARIABLE APP

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlActivities', function ($scope, activitiesService) {

    /*Se inicializa el modelo*/
    $scope.datos = "";
    $scope.activities = [];
    $scope.projects = [];
    $scope.users = [];
    $scope.idProyecto= "";
    $scope.idUsuarioSesion = sessionStorage.getItem("id");
    $scope.idUsuario = "";
    $("#srch-term").fadeOut();
    $("#div-data").fadeOut();
    //$scope.identificacion = "";

    /*Se define una funcion en el controlador*/
    $scope.saveActivity = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
          $scope.datos.idProyecto = $scope.idProyecto;
          $scope.datos.idUsuario = $scope.idUsuario;
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
            //  * el cual esta asociado a los input*/
            activitiesService.saveActivity($scope.datos).then(function (response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los
                // //      * asociados*/

                if (response == "OK"){
                    alert("ok");
                } else {
                    alert("error");
                }

                $scope.datos = "";
            });
        $scope.listActivities();
    };
    //modificar////////////////////////////////////////////
    $scope.update = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if (form) {


            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
            //  * el cual esta asociado a los input*/
            activitiesService.updateActivity($scope.datos).then(function (response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input
                // //      * asociados*/
                if (response == "OK") {
                    alert("ok");
                } else {
                    alert("error");
                }
                $scope.datos = "";
            });
        }else{
          alert("nada");
        }
    };
    ///Eliminar/////////////////////////////////////////////
    $scope.delete = function (codigo) {
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        activitiesService.deleteActivity(codigo).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input
            // //      * asociados*/
            if (response == "OK") {
                alert("ok");
            } else {
                alert("error");
            }
            $scope.datos = "";
            $scope.listActivities();

        });

    };
    $scope.listProjects = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        activitiesService.listProjects($scope.idUsuarioSesion).then(function(response) {
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

    $scope.listUsersByProject = function() {
      $scope.users = [];
      activitiesService.listUsersByProject($scope.idProyecto).then(function(response) {
          if (response.length > 0) {
              for (var i = 0; i < response.length; i++) {
                  $scope.users.push({
                      idUsuario: response[i]['idUsuario'],
                      nombres: response[i]['nombres'],
                      apellidos: response[i]['apellidos'],
                      nombreCompleto: response[i]['nombres'] + ' '+ response[i]['apellidos']
                  });
              }
          } else {
              alert("no hay datos");
          }
      });
    }

    //listActivities//////////////////////////////////////////
    $scope.listActivities = function () {
        $scope.activities = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        activitiesService.listActivities($scope.idProyecto, $scope.idUsuario).then(function (response) {
            if (response.length > 0)
            {
                for (var i = 0; i < response.length; i++)
                {
                    $scope.activities.push({
                      idActividad: response[i].idActividad,
                      idUsuario: response[i].idUsuario,
                      nombre: response[i].nombre,
                      descripcion: response[i].descripcion,
                      fechaInicio: response[i].fechaInicio,
                      fechaFin: response[i].fechaFin,
                      idProyecto: response[i].idProyecto
                    });
                }
            } else
            {
                $('.msgServidor').html("<div id='msg' class='alert alert-danger'>No hay registros de fincas <span class='glyphicon glyphicon-ok'></span></div>");
                setTimeout(function () {
                    $('.msgServidor').attr("display", "none");
                }, 5000);
            }
        });
    };

    //Ordenar Campos////////////////////////////////////////
    $scope.ordenarPorParametro = function (tipo)
    {
        $scope.ordenSeleccionado = tipo;
    };
    //Mostrar Campos
    $scope.mostrarCampos = function (codigo)
    {
        var lotesV = $scope.lotes;
        var lote;
        angular.forEach(lotesV, function (obj)
        {
            if (obj.codigo === codigo)
            {
                lote = obj;
                lote.metros=parseInt(obj.metros);

            }

        });
        //Seteo los campos
        $scope.identificacion = lote;
        $('#btnEditar').removeAttr('disabled');


    };
    $scope.selectProject = function(obj) {
        $scope.projects = [];
        $scope.projects.push({
            idProyecto: obj.idProyecto,
            nombre: obj.nombre
        });
        $scope.idProyecto=obj.idProyecto;
        $scope.listUsersByProject();
        $("#srch-term").fadeIn("slow");
    };
    $scope.selectUser = function(obj) {
      $scope.users = [];
      $scope.users.push({
        idUsuario: obj.idUsuario,
        nombreCompleto:obj.nombreCompleto
      });
      $scope.idUsuario = obj.idUsuario;
      $scope.listActivities();
      $("#div-data").fadeIn("slow");
    };

    $scope.getSelectedRow = function(obj){
      $("#srch-term").fadeIn("slow");
      $("#div-data").fadeIn("slow");
      obj.fechaInicio = new Date(obj.fechaInicio);
      obj.fechaFin = new Date(obj.fechaFin);
      $scope.datos = obj;
      $('#btn-edit').removeAttr('disabled');
    };
});
