/*Se definen las depenciencias que seran utilizadas por el sistema*/
var app = angular.module("appMasterUsers", ['ngRoute']);
app.controller('CtlUsers', function($scope) {
    $scope.usuario = sessionStorage.getItem("username");
});
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        //controller: 'controladorEstudiantes',
        templateUrl: 'inicioadmin.html'
    }).when('/myprojects', {
        controller: 'myprojectsCtl',
        templateUrl: 'myprojects.html'
    }).when('/status', {
        controller: 'statusUserCtl',
        templateUrl: 'statusUser.html'
    }).when('/meetings', {
        controller: 'meetingsUserCtl',
        templateUrl: 'meetingsUser.html',
    }).otherwise({
        redirectTo: '/'
    });
});