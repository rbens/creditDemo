export default function creditResult($mdDialog){
    'ngInject';
    return {
        restrict: 'E',
        template: require('./creditResult.html'),
        link: function(scope, element, attrs, fn) {
        },
        controller: function($scope) {
            'ngInject';
            $scope.modalResult =  function(ev) {
                $mdDialog.show({
                    title:'Informations sur les résultats',
                    parent: angular.element(document.body),
                    template : require('./infoCreditResult.html'),
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
}
