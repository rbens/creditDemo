export default function creditService($http) {
    return  {
        getAmortissement: function (credit) {
            return $http.post("amortissements", credit);
        },
        getTauxMarche : function(){
            return $http.get("rates");
        }
    };
}
