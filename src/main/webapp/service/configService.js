/**
 * Created by rbenseghir on 11/28/14.
 */
angular.module('mainApp').factory('configService', ['$resource', function ($resource) {
        return $resource('/config/config.json');
    }
]);
