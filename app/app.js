import angular from "angular";
import uiRouter from "@uirouter/angularjs";
import highchartsNg from "highcharts-ng";
import ngStrap from "angular-strap";
import ngMaterial from "angular-material";
import cgBusy from "angular-busy";
import ngResource from "angular-resource";


angular.module('mainApp', [ highchartsNg, ngStrap, ngMaterial, cgBusy, ngResource, uiRouter])
    .config(['$locationProvider','$stateProvider', function ($locationProvider, $stateProvider) {
        // use the HTML5 History API
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        $stateProvider.state({
            name:'root',
            url:'/',
            controller:'contentViewCtrl',
            templateUrl : './views/contentView.html'
        });

    }]).value('cgBusyDefaults',{
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
