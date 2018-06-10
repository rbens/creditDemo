'use strict';

import "./public/styles/css/main.css";

import contentViewCtrl from "./views/contentView";
import configService from "./service/configService";
import chartResultComponent from "./components/chartResult/chartResult.component";
import {creditForm} from "./components/creditForm/creditForm.component";
import creditResult from "./components/creditResult/creditResult.component";
import tabResult from "./components/tabResult/tabResult.component";
import {marketRate} from "./components/marketRate/marketRate.component";
import creditService from "./service/creditDemoService";
import routing from "./config/routing";


angular.module('mainApp', [ 'highcharts-ng', 'mgcrea.ngStrap', 'ngMaterial', 'cgBusy', 'ngResource', 'ui.router'])
    .factory('configService', configService)
    .factory('creditService', creditService)
    .controller('contentViewCtrl',contentViewCtrl)
    .directive('chartResultComponent',chartResultComponent)
    .directive('creditResult',creditResult)
    .directive('tabResult',tabResult)
    .component('creditForm',creditForm)
    .component('marketRate',marketRate)
    .config(routing)
    .run(function($rootScope){
        'ngInject';
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

