angular.module('mainApp').directive('creditResult',function($mdDialog){
    return {
        restrict: 'E',
        templateUrl: 'directive/creditResult/creditResult.html',
        link: function(scope, element, attrs, fn) {
        },
        controller: function($scope) {

            $scope.modal =  function(ev) {
                $mdDialog.show({
                    title:'Informations sur les résultats',
                    controller:DialogController,
                    parent: angular.element(document.body),
                    templateUrl : 'directive/creditResult/infoCreditResult.html',
                    targetEvent:ev,
                    clickOutsideToClose:true
                }).then(function() {
                    $scope.status = 'You decided to get rid of your debt.';
                });
            };

            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
            }

        }
    };
});
