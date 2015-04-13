angular.module('mainApp', ['mgcrea.ngStrap', 'highcharts-ng', 'mgcrea.ngStrap.helpers.dimensions', 'ui.bootstrap','ngMaterial','cgBusy'])
.config(function ($locationProvider) {
    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');
}).config(function ($scrollspyProvider) {
    angular.extend($scrollspyProvider.defaults, {
        animation: 'view-animate',
        placement: 'top'
    });
}).value('cgBusyDefaults',{
    message:'Chargement en cours',
}).run(['$rootScope', function($rootScope){

    $rootScope.rootPath = 'http://localhost:8090/';

    $rootScope.model = {
        annee: 0,
        capital: undefined,
        tauxNominal: 0.0,
        tauxAssurance: 0.0,
        tauxGlobal: 0.0,
    };

}]);
