import marketRateController from './marketRate.controller';


const marketRateComponent = {
        template : require('./marketRate.html'),
        controller:   'marketRateController' ,
        controllerAs : 'market'
};

angular.module('marketRate', [])
    .controller('marketRateController', marketRateController)
    .component('marketRateComponent', marketRateComponent);

