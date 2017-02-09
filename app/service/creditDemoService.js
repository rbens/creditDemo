angular.module('mainApp').factory('creditService', function ($http, $rootScope) {
    return  {
        getAmortissement: function (credit) {
            return $http.post($rootScope.rootPath + "amortissements", credit);
        },
        getSeries: function (credit) {
            return $http.post($rootScope.rootPath + "series", credit);
        }
    };
});
