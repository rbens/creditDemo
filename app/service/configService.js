angular.module('mainApp').factory('configService', function ($resource) {
        return $resource('/config/config.json');
    }
);
