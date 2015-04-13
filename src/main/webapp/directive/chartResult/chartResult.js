/**
 * Created by rbenseghir on 11/28/14.
 */
angular.module('mainApp').directive('chartResult', function () {
    return {
        restrict : 'E',
        templateUrl : '/directive/chartResult/chartResult.html',
        link : function(scope, element, attrs, fn){

        },
        controller: [ '$scope', function($scope) {

            $scope.line = {
                options: {
                    chart: {
                        type: 'line'
                    },
                    plotOptions: {
                        series: {
                            stacking: ''
                        }
                    }
                },
                series: [
                    {
                        data: []
                    }
                ],
                title: {
                    text: 'Évolution du remboursement mensuel'
                },
                xAxis: {
                    min: 0,
                    title: {text: 'mois'}
                },
                yAxis: {
                    min: 0,
                    title: {text: 'valeur en euros'}
                }
            };

            $scope.area = {
                options: {
                    chart: {
                        type: 'area'
                    },
                    plotOptions: {
                        series: {
                            stacking: ''
                        }
                    }
                },
                series: [
                    {
                        data: []
                    }
                ],
                title: {
                    text: 'Évolution du capital à rembourser'
                },
                xAxis: {
                    min: 0,
                    title: {text: 'mois'}
                },
                yAxis: {
                    min: 0,
                    title: {text: 'valeur en euros'}
                }
            };

            $scope.pie = {
                options: {
                    chart: {
                        type: 'pie'
                    }
                },
                series: [
                    {
                        data: []

                    }
                ],
                title: {
                    text: 'Répartition du remboursement total'
                }
            };

            $scope.options = [
                {"id": "pie", "title": "Répartition du remboursement"},
                {"id": "line", "title": "Évolution du remboursement"},
                {"id": "area", "title": "Évolution de la dette"}
            ];

            $scope.option = $scope.options[0];

            $scope.swapChartType = function (type) {
                this.line.options.chart.type = type.id;
                $scope.option = type;
            };
        }]
    };
});

