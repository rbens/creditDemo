'use strict';

import "./public/styles/css/main.css";

import contentViewCtrl from "./views/contentView";
import configService from "./service/configService";
import chartResultComponent from "./components/chartResult/chartResult.component";
import creditForm from "./components/creditForm/creditForm.component";
import creditResult from "./directive/creditResult/creditResult";
import tabResult from "./directive/tabResult/tabResult";
import marketRate from "./directive/marketRate/marketRate";
import creditService from "./service/creditDemoService";
import routing from "./config/routing";


angular.module('mainApp', [ 'highcharts-ng', 'mgcrea.ngStrap', 'ngMaterial', 'cgBusy', 'ngResource', 'ui.router'])
    .factory('configService', configService)
    .factory('creditService', creditService)
    .controller('contentViewCtrl',contentViewCtrl)
    .directive('chartResultComponent',chartResultComponent)
    .directive('creditForm',creditForm)
    .directive('creditResult',creditResult)
    .directive('tabResult',tabResult)
    .directive('marketRate',marketRate)
    .config(routing)
    .value('cgBusyDefaults',{
        template: require('./cg-template.html')
    }).run(function($rootScope){

        $rootScope.model = {
            duree: undefined,
            capital: undefined,
            tauxNominal: 0.0,
            tauxAssurance: 0.0,
            tauxGlobal: 0.0
        };
    });

angular.module('cgBusy').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('angular-busy.html',
        "<div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\">\n" +
        "<md-progress-circular md-mode=\"indeterminate\"></md-progress-circular>" +
        "</div>"
    );

}]);

