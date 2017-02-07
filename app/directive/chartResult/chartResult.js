angular.module('mainApp').directive('chartResult', function () {
    return {
        restrict : 'E',
        templateUrl : 'directive/chartResult/chartResult.html',
        link : function(scope, element, attrs, fn){

        },
        controller: function($scope, configService) {
            configService.get().$promise.then(
                function(config){
                    config.line.xAxis.labels.formatter = function() {
                            return this.value + 1;
                    };
                    config.area.xAxis.labels.formatter = function() {
                            return this.value + 1;
                    };

                    $scope.line = config.line;
                    $scope.area = config.area;
                    $scope.pie = config.pie;
                });

            $scope.options = [
                {"id": "chart1", "config": "pie" , "title": "Répartition du remboursement"},
                {"id": "chart2", "config": "line", "title": "Évolution du remboursement"},
                {"id": "chart3", "config": "area", "title": "Évolution de la dette"}
            ];

            $scope.option = $scope.options[0];

            $scope.swapChartType = function (type) {
                //this.line.options.chart.type = type;
                $scope.option.config = type;
            };
        }
    };
});

