'use strict';

function cityService($http, $resource) {
    "ngInject";
    return {
        getCities : (city,code) => $http.get('cities',{params :{"city":city, "code":code}}),
        loadCitiesFromJson : () => $resource('../cities/cities.json')
    };
}

angular.module('cities', []) .factory('cityService', cityService);