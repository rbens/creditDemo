angular.module('mainApp').directive('creditResult',function($mdDialog){
    return {
        restrict: 'E',
        templateUrl: 'directive/creditResult/creditResult.html',
        link: function(scope, element, attrs, fn) {
        },
        controller: function($scope) {

            $scope.modalResult =  function(ev) {
                $mdDialog.show({
                    title:'Informations sur les résultats',
                    parent: angular.element(document.body),
                    templateUrl : 'directive/creditResult/infoCreditResult.html',
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
