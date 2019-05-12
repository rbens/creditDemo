import marketRateController from './marketRate.controller';


const marketRateComponent = {
        template : require('./marketRate.html'),
        controller:   marketRateController ,
        controllerAs : 'market'
};

angular.module('marketRate', [])
    .component('marketRateComponent', marketRateComponent);

