'use strict';

function cityService($resource) {
    "ngInject";
    return {
        loadCitiesFromJson : () => $resource('../cities/cities.json')
    };
}

angular.module('cities', []) .factory('cityService', cityService);