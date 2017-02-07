angular.module('mainApp').controller('content', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        $mdSidenav('left').close()
            .then(function(){
                $log.debug("close LEFT is done");
            });
    };
});
