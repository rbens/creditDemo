'use strict';

import "./public/styles/css/main.css";

import contentViewCtrl from "./controller/contentView";
import configService from "./service/config.service";
import {creditResult} from "./components/creditResult/creditResult.component";
import {tabResult} from "./components/tabResult/tabResult.component";
import {chartResultComponent} from "./components/chartResult/chartResult.component";
import {creditForm} from "./components/creditForm/creditForm.component";
import {marketRate} from "./components/marketRate/marketRate.component";
import format from "./filter/format.filter"
import creditService from "./service/creditDemo.service";
import routing from "./config/routing";


angular.module('mainApp', [ 'highcharts-ng', 'mgcrea.ngStrap', 'ngMaterial', 'cgBusy', 'ngResource', 'ui.router','duScroll'])
    .filter('euro', () => format.euro)
    .filter('rate', () => format.rate)
    .filter('year', () => format.year)
    .factory('configService', configService)
    .factory('creditService', creditService)
    .controller('contentViewCtrl',contentViewCtrl)
    .component('creditResult',creditResult)
    .component('tabResult',tabResult)
    .component('chartResultComponent',chartResultComponent)
    .component('creditForm',creditForm)
    .component('marketRate',marketRate)
    .config(routing);

//override cgBusy templateCache
angular.module('cgBusy').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('angular-busy.html',
        "<div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\">\n" +
        "<md-progress-circular md-mode=\"indeterminate\"></md-progress-circular>" +
        "</div>"
    );

}]);

