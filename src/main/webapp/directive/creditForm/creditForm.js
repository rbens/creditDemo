/**
 * Created by rbenseghir on 11/28/14.
 */
angular.module('mainApp').directive('creditForm', function () {
    return {
        restrict : 'E',
        templateUrl : '/directive/creditForm/creditForm.html',
        link : function(scope,element,attrs,fn){

        },
        controller : ['$rootScope','$scope', '$filter', '$timeout', 'creditService', function ($rootScope,$scope, $filter, $timeout, creditService) {
            var time;
            $scope.calcul = function () {
                $timeout.cancel( time );

                time = $timeout(function(){
                        if (isComplete()) {
                            var tauxNominal = $scope.model.tauxNominal !== 0 ? $scope.model.tauxNominal : $scope.model.tauxGlobal;
                            $rootScope.promise =  creditService.getAmortissement({mois: $scope.model.annee * 12 + "", capital: $scope.model.capital, tauxNominal: tauxNominal, tauxAssurance: $scope.model.tauxAssurance})
                                .then(function (response) {
                                    var data = response.data;
                                    //noinspection JSUnresolvedVariable
                                    if (data.coutPrincipal) {
                                        var amortissements = data.amortissements;
                                        var last = (amortissements.length - 1);
                                        var inter = data.interetSeries[last];
                                        var assu  = data.assuranceSeries[last];
                                        var cred  = data.creditSeries[last];

                                        addSeries(data.interetSeries, data.assuranceSeries, data.creditSeries,data.capitalRestantSeries, data.interetRestantSeries);
                                        addSeriesToPieChart(inter, assu, data.capital);

                                        $scope.model.amortissements     = amortissements;
                                        $scope.model.assurance          = formatNumber(data.assuranceSeries[0]).concat(' €');
                                        $scope.model.mensualite         = formatNumber(data.mensualite).concat(' €');
                                        $scope.model.interetTotal       = formatNumber(inter).concat(' €');
                                        $scope.model.assuranceTotal     = formatNumber(assu).concat(' €');
                                        $scope.model.creditTotal        = formatNumber(cred).concat(' €');
                                        $scope.model.remboursementTotal = formatNumber(cred + Number($scope.model.capital)).concat(' €');
                                    }
                                });

                        } else {
                            $scope.model.amortissements = [];
                            $scope.model.mensualite = undefined;
                            $scope.model.interetTotal = undefined;
                            $scope.model.assuranceTotal = undefined;
                            $scope.model.creditTotal = undefined;
                            $scope.model.assurance = undefined;
                        }
                },1500);
            };

            $scope.teg = function () {
                $scope.model.tauxNominal = Number(formatNumber($scope.model.tauxNominal));
                $scope.model.tauxAssurance = Number(formatNumber($scope.model.tauxAssurance));
                $scope.model.tauxGlobal =  $scope.model.tauxNominal + $scope.model.tauxAssurance;
            };

            function formatNumber(data) {
                return $filter('number')(data, 2);
            }

            function isComplete() {
                return isDefined($scope.model.annee) && isDefined($scope.model.capital) && isDefined($scope.model.tauxGlobal);
            }

            function isDefined(value) {
                return value !== null && value !== 0;
            }

            function addSeries(interetSeries, assuranceSeries, creditSeries, capitalRestantSeries, interetRestantSeries) {
                $scope.line.series = [];
                $scope.line.series.push({
                    "name": 'Intérets',
                    "data": interetSeries
                }, {
                    "name": 'Assurance',
                    "data": assuranceSeries
                }, {
                    "name": 'Crédit',
                    "data": creditSeries
                });

                $scope.area.series = [];
                $scope.area.series.push({
                    "name": 'Capital restant',
                    "data": capitalRestantSeries
                },{
                    "name": 'Intéret restant',
                    "data": interetRestantSeries
                });
            }

            function addSeriesToPieChart(interetSeries, assuranceSeries, creditSeries) {
                $scope.pie.series = [];
                $scope.pie.series.push({
                    type: 'pie',
                    name: 'somme en euros',
                    data: [
                        ['Cout total interets ', interetSeries],
                        ['Cout total assurances', assuranceSeries],
                        ['Capital emprunté', creditSeries]
                    ]

                });
            }

        }]
    };

});