angular.module('mainApp', ['highcharts-ng','mgcrea.ngStrap','ngMaterial','cgBusy','ngResource', 'ngRoute','duScroll'])
    .config(function ($locationProvider, $routeProvider, $scrollspyProvider) {
        // use the HTML5 History API
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        $routeProvider.when('/',{
            controller:'contentViewCtrl',
            templateUrl : 'views/contentView.html'
        });

        angular.extend($scrollspyProvider.defaults, {
            animation: 'view-animate',
            placement: 'top'
        });

    }).value('cgBusyDefaults',{
        templateUrl:'cg-template.html'
    }).run(['$rootScope', function($rootScope){

        $rootScope.rootPath = '//localhost:8090/';

        $rootScope.model = {
            duree: undefined,
            capital: undefined,
            tauxNominal: 0.0,
            tauxAssurance: 0.0,
            tauxGlobal: 0.0
        };

    }]);
