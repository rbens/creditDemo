angular.module('mainApp').controller('contentViewCtrl', function($scope, $window, $mdDialog, configService) {
    var initDemo =  $window.localStorage.getItem('hideVideo') ? JSON.parse($window.localStorage.getItem('hideVideo')) : false;

    function DiaController($scope,$mdDialog,$window) {
        $scope.hideVideo =  $window.localStorage.getItem('hideVideo') ? JSON.parse($window.localStorage.getItem('hideVideo')) : false;

        $scope.hide = function() {
            $mdDialog.hide();
        };

        //use $watch, because the change detection with ng-change misses the first change
        $scope.$watch('hideVideo',function(){
            $window.localStorage.setItem('hideVideo',$scope.hideVideo);
        });
    }

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
        configService.get().$promise.then(
            function(config){
                if(!initDemo && screen.width > 660 && config.activeDemoVideo){
                    $mdDialog.show({
                        parent: angular.element(document.body),
                        controller: DiaController,
                        templateUrl : 'views/modalTuto.html',
                        targetEvent:ev,
                        clickOutsideToClose:false
                    }).then(function() {
                        $scope.status = 'cancel';
                    },function(){
                        $scope.status = 'close';
                    });
                }
            });
    });

});


