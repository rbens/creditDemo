export default function creditService($http, $rootScope) {
    return  {
        getAmortissement: function (credit) {
            return $http.post($rootScope.rootPath + "amortissements", credit);
        },
        getTauxMarche : function(){
            return $http.get($rootScope.rootPath + "rates");
        }
    };
}
