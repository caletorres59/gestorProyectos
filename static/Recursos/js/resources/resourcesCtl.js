/* global app */
//CREO MI VARIABLE APP

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlResources', function ($scope, resourcesService) {

    /*Se inicializa el modelo*/
    $scope.datos = "";
    $scope.resources = [];
    $scope.projects = [];
    $scope.idProyecto= "";
    $scope.idUsuarioSesion = sessionStorage.getItem("id");
    $("#srch-term").fadeOut();
    $("#div-data").fadeOut();
    //$scope.identificacion = "";

    /*Se define una funcion en el controlador*/
    $scope.saveResource = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
          $scope.datos.idProyecto = $scope.idProyecto;
          $scope.datos.idUsuario = $scope.idUsuario;
          if($scope.isNullOrEmpty($scope.datos.nombre)||$scope.isNullOrEmpty($scope.datos.cantidad)
        ||$scope.isNullOrEmpty($scope.datos.descripcion)||$scope.isNullOrEmpty($scope.datos.ubicacion)){
          $(".alerts").html("<div class='error'><p>Check the entered data</p></div>");
          }else{
            resourcesService.saveResource($scope.datos).then(function (response) {
                // //     /*El resultado de la promesa se recibe por parametro
                if (response == "OK"){
                  $(".alerts").html("<div class='info'><p>Resource created correctly</p></div>");
                } else {
                    $(".alerts").html("<div class='error'><p>The Resource was not saved</p></div>");
                }

                $scope.datos = "";
            });

            $scope.listresources();
          }
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
            //  * el cual esta asociado a los input*/

    };
    //modificar////////////////////////////////////////////
    $scope.update = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if($scope.isNullOrEmpty($scope.datos.nombre)||$scope.isNullOrEmpty($scope.datos.cantidad)
      ||$scope.isNullOrEmpty($scope.datos.descripcion)||$scope.isNullOrEmpty($scope.datos.ubicacion)){
        $(".alerts").html("<div class='error'><p>Check the entered data</p></div>");
        }else{
        if (form) {


            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
            //  * el cual esta asociado a los input*/
            resourcesService.updateResource($scope.datos).then(function (response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input
                // //      * asociados*/
                if (response == "OK"){
                  $(".alerts").html("<div class='info'><p>Resource updated correctly</p></div>");
                } else {
                    $(".alerts").html("<div class='error'><p>The Resource was not updated</p></div>");
                }
                $scope.datos = "";
            });
        }

        $scope.listresources();
      }
    };
    ///Eliminar/////////////////////////////////////////////
    $scope.deleteResource = function (codigo) {
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        resourcesService.deleteResource(codigo).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input
            // //      * asociados*/
            if (response == "OK"){
              $(".alerts").html("<div class='info'><p>Resource deleted correctly</p></div>");
            } else {
                $(".alerts").html("<div class='error'><p>The Resource was not deleted</p></div>");
            }
            $scope.datos = "";
            $scope.listresources();

        });

    };
    $scope.listProjects = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        resourcesService.listProjects($scope.idUsuarioSesion).then(function(response) {
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

    //listresources//////////////////////////////////////////
    $scope.listresources = function () {
        $scope.resources = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion,
        //  * el cual esta asociado a los input*/
        resourcesService.listresources($scope.idProyecto).then(function (response) {
            if (response.length > 0)
            {
                for (var i = 0; i < response.length; i++)
                {
                    $scope.resources.push({
                      idRecurso: response[i].idRecurso,
                      nombre: response[i].nombre,
                      cantidad: response[i].cantidad,
                      descripcion: response[i].descripcion,
                      ubicacion: response[i].ubicacion,
                      idProyecto: response[i].idProyecto
                    });
                }
            } else
            {
                $('.msgServidor').html("<div id='msg' class='alert alert-danger'>No hay registros de fincas <span class='glyphicon glyphicon-ok'></span></div>");
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
        $scope.listresources();
        $("#div-data").fadeIn("slow");
    };

    $scope.getSelectedRow = function(obj){
      $("#srch-term").fadeIn("slow");
      $("#div-data").fadeIn("slow");
      $scope.datos = obj;
      $scope.datos.cantidad = parseInt(obj.cantidad);
      $('#btn-edit').removeAttr('disabled');
    };

    $scope.isNullOrEmpty = function(obj) {
        if (obj == null || obj == "") {
            return true;
        }
        return false;
    };
});
