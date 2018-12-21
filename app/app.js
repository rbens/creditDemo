'use strict';

import "./public/styles/css/main.css";

import "./filter/format.filter";
import "./components/main/main.controller";
import "./components/mortgageResult/mortgageResult.component";
import "./components/amortization/amortization.component";
import "./components/chartResult/chartResult.component";
import "./components/mortgageData/mortgageData.component";
import "./components/marketRate/marketRate.component";
import routing from "./config/routing";


let modules = [ 'highcharts-ng', 'mgcrea.ngStrap', 'ngMaterial', 'cgBusy', 'ngResource', 'ui.router','duScroll',
    'main',
    'chartResult',
    'mortgageData',
    'marketRate',
    'mortgageResult',
    'amortization',
    'format',];

angular.module('mainApp', modules)
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

