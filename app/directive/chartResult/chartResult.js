angular.module('mainApp').directive('chartResult', function (configService, $window) {
    return {
        restrict : 'E',
        templateUrl : 'directive/chartResult/chartResult.html',
        link : function(scope, element, attrs, fn){

        },
        controller: function($scope) {
            configService.get().$promise.then(
                function(config){
                    config.line.xAxis.labels.formatter = function() {
                            return this.value/12;
                    };
                    config.area.xAxis.labels.formatter = function() {
                            return this.value/12;
                    };

                    $scope.line = config.line;
                    $scope.area = config.area;
                    $scope.pie = config.pie;
                });

            var options = [
                {"id": "chart1", "config": "pie" , "title": "Répartition du remboursement"},
                {"id": "chart2", "config": "line", "title": "Évolution du remboursement"},
                {"id": "chart3", "config": "area", "title": "Évolution de la dette"}
            ];

            $scope.panelWidth = angular.element('.panel-body').css('width');

            angular.element($window).bind('resize', function(){
                $scope.panelWidth = angular.element('.panel-body').css('width');
                $scope.$digest();
            });

            $scope.option = options[0];

            $scope.swapChartType = function (index) {
                $scope.option = options[index];
            };

            $scope.openMenu = function($mdMenu, ev) {
                $mdMenu.open(ev);
            };
        }
    };
});

