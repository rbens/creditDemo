import marketRateController from './marketRate.controller';
import * as angular from "angular";
declare var require: (filename: string) => any;


const marketRateComponent = {
        template : require('./marketRate.html'),
        controller:   marketRateController ,
        controllerAs : 'market'
};

angular.module('marketRate', [])
    .component('marketRateComponent', marketRateComponent);