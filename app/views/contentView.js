export default function contentViewCtrl($scope, $window, $mdDialog, configService, creditService, $document) {
    'ngInject';
    let initDemo =  $window.localStorage.getItem('hideVideo') ? JSON.parse($window.localStorage.getItem('hideVideo')) : false;

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

    $scope.dataModel = creditService.getDataModel();
    $scope.promiseForm = creditService.promiseForm;

    $scope.openVideo =  function(ev){
        $mdDialog.show({
            parent: $document.body,
            controller: DiaController,
            template : require('./modalTuto.html'),
            targetEvent:ev,
            clickOutsideToClose:false
        }).then(function(answer) {
            $scope.status = 'cancel';
        },function(){
            $scope.status = 'close';
        });
    };

    $document.ready(function (ev) {
        configService.get().$promise.then(
            function(config){
                if(!initDemo && screen.width > 660 && config.activeDemoVideo){
                    $mdDialog.show({
                        parent: $document.body,
                        controller: DiaController,
                        template : require('./modalTuto.html'),
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

}


