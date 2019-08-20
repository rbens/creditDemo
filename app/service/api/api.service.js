'use strict';

function apiService($http) {
    "ngInject";
    return {
        getAmortization : (credit) => $http.post("amortissements", credit),
        getMarketRates: () => $http.get("rates"),
        getNotaryFees: (notaryFrees) => $http.get('real-estate-fees', {
            params: {
                'cost': notaryFrees.cost,
                'propertyType': notaryFrees.propertyType,
                'zip': notaryFrees.code
            }})
    };
}

angular.module('api', []) .factory('apiService', apiService);