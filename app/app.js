'use strict';

import "./public/styles/css/main.css";
import "./public/styles/main.scss";

import "./filter/format.filter";
import "./components/main/main.controller";
import "./components/mortgageResult/mortgageResult.component";
import "./components/amortization/amortization.component";
import "./components/chartResult/chartResult.component";
import "./components/mortgageData/mortgageData.component";
import "./components/marketRate/marketRate.component";
import "./components/notaryFees/notaryFees.controller";

import './service/api/api.service';
import './service/config/config.service';
import './service/loan/credit.service';


import routing from "./service/route/routing";


let modules = [ 'highcharts-ng', 'ngMaterial', 'cgBusy', 'ui.router',
    'config',
    'creditService',
    'main',
    'chartResult',
    'mortgageData',
    'marketRate',
    'mortgageResult',
    'amortization',
    'format',
    'notaryFees',
    'api'];

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

