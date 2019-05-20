import mortgageDataController from "./mortgageData.controller";

export const mortgageDataComponent = {
        template: require('./mortgageData.html'),
        controller: mortgageDataController
};

angular.module('mortgageData',[]).component('mortgageDataComponent',mortgageDataComponent);

