import amortizationController from './amortization.controller';

const amortizationComponent = {
    bindings: {
        model: '<'
    },
    template: require('./amortization.html'),
    controller: amortizationController
};

angular.module('amortization', []).component('amortizationComponent', amortizationComponent);
