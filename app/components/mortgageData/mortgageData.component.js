import creditFormController from "./mortgageData.controller";

export const mortgageDataComponent = {
        template: require('./mortgageData.html'),
        controller: creditFormController
};

angular.module('mortgageData',[]).component('mortgageDataComponent',mortgageDataComponent);

