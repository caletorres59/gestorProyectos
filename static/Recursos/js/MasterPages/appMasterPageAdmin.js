/*Se definen las depenciencias que seran utilizadas por el sistema*/
var app = angular.module("appMasterAdmin", ['ngRoute']);
app.controller('CtlAdmin', function($scope) {
    $scope.usuario = sessionStorage.getItem("username");
});
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        //controller: 'controladorEstudiantes',
        templateUrl: 'inicioadmin.html'
    }).when('/projects', {
        controller: 'CtlProjects',
        templateUrl: 'projects.html'
    }).when('/jobs', {
        controller: 'CtlJobs',
        templateUrl: 'jobs.html'
    }).when('/team', {
        controller: 'CtlTeam',
        templateUrl: 'team.html'
    }).when('/activities', {
        controller: 'CtlActivities',
        templateUrl: 'activities.html'
    }).when('/tasks', {
        controller: 'CtlTask',
        templateUrl: 'task.html'
    }).when('/resources', {
        controller: 'CtlResources',
        templateUrl: 'resources.html'
    }).when('/status', {
        controller: 'CtlStatus',
        templateUrl: 'status.html'
    }).otherwise({
        redirectTo: '/'
    });
});