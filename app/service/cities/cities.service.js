'use strict';
import "angular-resource";

function cityService($resource) {
    "ngInject";
    return {
        loadCitiesFromJson : () => $resource('../cities/cities.json')
    };
}

angular.module('cities', ['ngResource']) .factory('cityService', cityService);