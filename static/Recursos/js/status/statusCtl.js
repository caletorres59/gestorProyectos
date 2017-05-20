app.controller('CtlStatus', function($scope, statusService) {
    /*Se inicializa el modelo*/
    $scope.projects = [];
    $scope.idUsuario = sessionStorage.getItem("id");
    $scope.itemsprojects = [];
    $(".allitems").fadeOut();
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.listProject = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        statusService.listProject($scope.idUsuario).then(function(response) {
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
    $scope.listItemsProyect = function(codigo) {
        $scope.itemsprojects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        statusService.listItemsProyect(codigo).then(function(response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            alert(response.length);
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
    $scope.projectSelected = function(obj) {
        $scope.listItemsProyect(obj.idProyecto);
    };
    // $scope.listItemsProyect(obj.idProyecto);
    //modificar////////////////////////////////////////////
    ///Eliminar/////////////////////////////////////////////
    //listar//////////////////////////////////////////
    //validate
    $scope.listProject();
});