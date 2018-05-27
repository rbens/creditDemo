'use strict';

import "./public/styles/css/main.css";
import "./public/styles/less/credit.less";


import contentViewCtrl from "./views/contentView";
import configService from "./service/configService";
import chartResult from "./directive/chartResult/chartResult";
import creditForm from "./directive/creditForm/creditForm";
import creditResult from "./directive/creditResult/creditResult";
import tabResult from "./directive/tabResult/tabResult";
import marketRate from "./directive/marketRate/marketRate";
import creditService from "./service/creditDemoService";
import routing from "./config/routing";


angular.module('mainApp', [ 'highcharts-ng', 'mgcrea.ngStrap', 'ngMaterial', 'cgBusy', 'ngResource', 'ui.router'])
    .factory('configService', configService)
    .factory('creditService', creditService)
    .controller('contentViewCtrl',contentViewCtrl)
    .directive('chartResult',chartResult)
    .directive('creditForm',creditForm)
    .directive('creditResult',creditResult)
    .directive('tabResult',tabResult)
    .directive('marketRate',marketRate)
    .config(routing)
    .value('cgBusyDefaults',{
        template: require('./cg-template.html')
    }).run(function($rootScope){

        $rootScope.rootPath = '//localhost:8090/';

        $rootScope.model = {
            duree: undefined,
            capital: undefined,
            tauxNominal: 0.0,
            tauxAssurance: 0.0,
            tauxGlobal: 0.0
        };

    });
