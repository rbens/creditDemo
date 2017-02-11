angular.module('mainApp').controller('content', function($scope, $window, $mdDialog) {
    var showVideo = $window.localStorage.getItem('showVideo') || true;

    $scope.openVideo =  function(ev){
        $mdDialog.show({
            parent: angular.element(document.body),
            controller: DiaController,
            templateUrl : 'views/modalTuto.html',
            targetEvent:ev,
            clickOutsideToClose:false
        }).then(function(answer) {
            $scope.status = 'cancel';
        },function(){
            $scope.status = 'close';
        });

    };

    angular.element(document).ready(function (ev) {
        if(showVideo !== 'false'){
            $mdDialog.show({
                parent: angular.element(document.body),
                controller: DiaController,
                templateUrl : 'views/modalTuto.html',
                targetEvent:ev,
                clickOutsideToClose:false
            }).then(function(answer) {
                $scope.status = 'cancel';
            },function(){
                $scope.status = 'close';
            });

        }

    });

});

function DiaController($scope,$window,$mdDialog) {
    $scope.showVideo = $window.localStorage.getItem('showVideo') || false;

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    $scope.onChange = function(value){
        $window.localStorage.setItem('showVideo',value);
    };
}

