'use strict';

function apiService($http) {
    "ngInject";
    return {
        getCities : (city,code) => $http.get('cities',{params :{"city":city, "code":code}}),
        getAmortization : (credit) => $http.post("amortissements", credit),
        getMarketRates: () => $http.get("rates"),
        getNotaryFees: (notaryFrees) => $http.get('notary-frees', {
            params: {
                'cost': notaryFrees.cost,
                'propertyType': notaryFrees.propertyType,
                'zip': notaryFrees.localite.code
            }})
    };
}

angular.module('api', []) .factory('apiService', apiService);