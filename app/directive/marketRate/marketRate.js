angular.module('mainApp').directive('marketRate', function (creditService, $mdDialog, $interval) {
    return {
        restrict : 'E',
        templateUrl : 'directive/marketRate/marketRate.html',
        link : function(scope, element, attrs, fn){

        },
        controller: function($scope) {
            var intervalPromise = $interval(function () {
                $scope.currentId++;
                $scope.currentId = $scope.rates.length < $scope.currentId ? 0 : $scope.currentId;
            }, 1000);
            $scope.rates = [];
            $scope.currentId = 0;
            $scope.isCancel = false;

             creditService.getTauxMarche().then(
                function success(response){
                    if(response){
                        var id = 1;
                        angular.forEach(response.data, function(val,key){
                            $scope.rates.push({
                                id : id++,
                                rate  : val,
                                years : key === 0 ? 7 : 10+((key-1) *5)
                            });
                        });
                    }
                });

            $scope.updateRate = function(result){
                $scope.model.tauxNominal = Number(result.rate.replace('%','').replace(',','.'));
                $scope.model.annee = result.years;
                $scope.calcul();
                $interval.cancel(intervalPromise);
                $scope.isCancel = true;
            };

            $scope.modalRate =  function(ev) {
                $mdDialog.show({
                    parent: angular.element(document.body),
                    templateUrl : 'directive/marketRate/infoMarketRate.html',
                    targetEvent:ev,
                    clickOutsideToClose:true
                }).then(function() {
                    $scope.status = 'cancel';
                },function(){
                    $scope.status = 'close';
                });
            };

        }
    };
});

