export default function contentViewCtrl($scope, $window, $mdDialog, configService, creditService, $document) {
    'ngInject';
    let initDemo =  $window.localStorage.getItem('hideVideo') ? JSON.parse($window.localStorage.getItem('hideVideo')) : false;

    let DiaController = ($scope,$mdDialog,$window) => {
        $scope.hideVideo =  $window.localStorage.getItem('hideVideo') ? JSON.parse($window.localStorage.getItem('hideVideo')) : false;
        $scope.hide = () => $mdDialog.hide();
        //use $watch, because the change detection with ng-change misses the first change
        $scope.$watch('hideVideo',() => $window.localStorage.setItem('hideVideo',$scope.hideVideo));
    };

    $scope.dataModel = creditService.getDataModel();

    $scope.openVideo =  (ev) => {
        $mdDialog.show({
            parent: $document.body,
            controller: DiaController,
            template : require('./modalTuto.html'),
            targetEvent:ev,
            clickOutsideToClose:false
        }).then(
            () => $scope.status = 'cancel',
            () => $scope.status = 'close'
        );
    };

    $document.ready((ev) => {
        configService.get().$promise.then(
            (config) => {
                if(!initDemo && screen.width > 660 && config.activeDemoVideo){
                    $mdDialog.show({
                        parent: $document.body,
                        controller: DiaController,
                        template : require('./modalTuto.html'),
                        targetEvent:ev,
                        clickOutsideToClose:false
                    }).then(
                        () => $scope.status = 'cancel',
                        () => $scope.status = 'close'
                    );
                }
            });
    });

}

