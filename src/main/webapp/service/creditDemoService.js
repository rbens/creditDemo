/**
 * Created by rbenseghir on 11/28/14.
 */
angular.module('mainApp').factory('creditService', function ($http, $rootScope,$q) {
    var deferred = $q.defer();
    return  {
        getAmortissement: function (credit) {
            return $http.post($rootScope.rootPath + "amortissements", credit).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject("An error occured [RootCause] " + error);
            });
        }
    };
});
