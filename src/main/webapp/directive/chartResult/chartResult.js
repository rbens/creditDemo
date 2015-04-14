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
                    text: 'Évolution du remboursement (crédit, intérets, assurance) '
                },
                xAxis: {
                    min: 1,
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
                        type: 'spline'
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
                    text: 'Évolution de la dette (totalité de la somme, capital emprunté)'
                },
                xAxis: {
                    min: 1,
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
                {"id": "chart1", "config": "pie" , "title": "Répartition du remboursement"},
                {"id": "chart2", "config": "line", "title": "Évolution du remboursement"},
                {"id": "chart3", "config": "area", "title": "Évolution de la dette"}
            ];

            $scope.option = $scope.options[0];

            $scope.swapChartType = function (type) {
                this.line.options.chart.type = type;
                $scope.option.config = type;
            };
        }]
    };
});

