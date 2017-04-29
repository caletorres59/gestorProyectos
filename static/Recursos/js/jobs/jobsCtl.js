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
    //$scope.identificacion = "";
    /*Se define una funcion en el controlador*/
    $scope.saveJobs = function(form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if (form) {
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            jobsService.saveJobs($scope.datos).then(function(response) {
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
        } else {
            alert("Verifique los datos ingresados");
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
        if (form) {
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            jobsService.update($scope.datos).then(function(response) {
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
            alert("controller");
            if (response == "OK") {
                alert("ok");
            } else {
                alert("error");
            }
            $scope.datos = "";
            $scope.listJobs();
        });
    };
    //listar//////////////////////////////////////////
    $scope.listJobs = function() {
        $scope.projects = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        jobsService.listJobs().then(function(response) {
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
                        salario: response[i]['salario']
                    });
                }
            } else {
                alert("no hay datos");
            }
        });
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