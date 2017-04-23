/*Se definen las depenciencias que seran utilizadas por el sistema*/
var app = angular.module("appMasterUsers", ['ngRoute']);
app.controller('CtlUsers', function($scope) {
    $scope.usuario = sessionStorage.getItem("username");
});
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        //controller: 'controladorEstudiantes',
        templateUrl: 'inicioadmin.html'
        // }).when('/Presentaciones', {
        //     controller: 'controladorPresentacion',
        //     templateUrl: 'gestionPresentacion.html'
        // }).when('/Producciones', {
        //     controller: 'controladorProduccion',
        //     templateUrl: 'gestionProduccion.html'
        // }).when('/Logo', {
        //     templateUrl: 'gestionLogo.html'
    }).otherwise({
        redirectTo: '/'
    });
});