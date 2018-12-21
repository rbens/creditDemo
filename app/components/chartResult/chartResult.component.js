import chartResultController from "./chartResult.controller";

const chartResultComponent = {
    bindings: {
        model: '<'
    },
    template: require('./chartResult.html'),
    controller: chartResultController
};

angular.module('chartResult',[]).component('chartResultComponent',chartResultComponent);



