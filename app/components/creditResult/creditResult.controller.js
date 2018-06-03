export default function creditResultController($scope,$mdDialog) {
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