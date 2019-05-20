'use strict';

export default function configService($resource) {
    "ngInject";
    return $resource('../config/config.json');
}

angular.module('config', ['ngResource']) .factory('configService', configService);