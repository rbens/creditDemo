import mortgageResultController from './mortgageResult.controller';

const mortgageResultComponent = {
    bindings: {
        model: '<'
    },
    template: require('./mortgageResult.html'),
    controller: mortgageResultController
};

angular.module('mortgageResult',[]).component('mortgageResultComponent',mortgageResultComponent);
