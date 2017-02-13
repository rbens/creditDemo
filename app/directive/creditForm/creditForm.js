angular.module('mainApp').directive('creditForm', function () {
    return {
        restrict : 'E',
        templateUrl : 'directive/creditForm/creditForm.html',
        link : function(scope,element,attrs,fn){

        },
        controller : function ($scope, $filter, $q, $timeout, creditService, $mdDialog) {
            var time,
                formatNumber = function(data) {
                    return $filter('number')(data, 2);
                },
                isComplete = function() {
                    return isDefined($scope.model.annee) && isDefined(Number($scope.model.capital)) && isDefined($scope.model.tauxNominal);
                },
                isDefined = function(value) {
                    return value !== null && value !== 0;
                },
                addSeries = function(interetSeries, assuranceSeries, creditSeries, capitalRestantSeries, interetRestantSeries) {
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
                        "name": 'Total restant',
                        "data": interetRestantSeries
                    });

                    $scope.line.xAxis.tickInterval = creditSeries.length < 60 ? 1 : 12;
                    $scope.area.xAxis.tickInterval =  creditSeries.length < 60 ? 1 : 12;
                }, addSeriesToPieChart = function(interetSeries, assuranceSeries, creditSeries) {
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
                };

            $scope.model.annee = 0;
            $scope.model.tauxNominal = 0;
            $scope.model.tauxAssurance = 0;


            $scope.calcul = function () {
                $timeout.cancel( time );

                time = $timeout(function(){
                    if (isComplete()) {
                        var tauxNominal = $scope.model.tauxNominal !== 0 ? $scope.model.tauxNominal : $scope.model.tauxGlobal;

                        $scope.promiseForm = $q.all([
                            creditService.getAmortissement({months: $scope.model.annee * 12 + "", capital: $scope.model.capital, interestRate: tauxNominal, insuranceRate: $scope.model.tauxAssurance})
                                .then(function (response) {
                                    var data = response.data;
                                    //noinspection JSUnresolvedVariable
                                    if (data.coutPrincipal) {
                                        $scope.model.amortissements     = data.writeDowns;
                                        $scope.model.assurance          = formatNumber(data.coutAssurance).concat(' €');
                                        $scope.model.mensualite         = formatNumber(data.monthlyAmount).concat(' €');
                                        $scope.model.interetTotal       = formatNumber(data.interestTotalCost).concat(' €');
                                        $scope.model.assuranceTotal     = formatNumber(data.insuranceTotalCost).concat(' €');
                                        $scope.model.creditTotal        = formatNumber(data.creditTotalCost).concat(' €');
                                        $scope.model.remboursementTotal = formatNumber(data.owingTotalCost).concat(' €');

                                        var last = (data.writeDowns.length - 1);
                                        addSeries(data.interetSeries, data.assuranceSeries, data.creditSeries,data.capitalRestantSeries, data.totalRestantSeries);
                                        addSeriesToPieChart(data.interetSeries[last], data.assuranceSeries[last], data.capital);
                                    }
                                })
                        ]);
                    } else {
                        $scope.model.amortissements = [];
                        $scope.model.mensualite = formatNumber(0).concat(' €');
                        $scope.model.interetTotal = formatNumber(0).concat(' €');
                        $scope.model.assuranceTotal = formatNumber(0).concat(' €');
                        $scope.model.creditTotal = formatNumber(0).concat(' €');
                        $scope.model.assurance = formatNumber(0).concat(' €');
                        $scope.model.remboursementTotal = formatNumber(0).concat(' €');
                    }
                },1500);
            };

            $scope.teg = function(){
                $scope.model.tauxNominal = Number(formatNumber($scope.model.tauxNominal));
                $scope.model.tauxAssurance = Number(formatNumber($scope.model.tauxAssurance));
                $scope.model.tauxGlobal =  $scope.model.tauxNominal + $scope.model.tauxAssurance;
            };



            $scope.modalForm =  function(ev) {
                $mdDialog.show({
                  parent: angular.element(document.body),
                  templateUrl : 'directive/creditForm/infoCreditForm.html',
                  targetEvent:ev,
                  clickOutsideToClose:true
                }).then(function() {
                    $scope.status = 'cancel';
                },function(){
                    $scope.status = 'close';
                });
            };

            $scope.reset = function(){
                $scope.model.capital = "";
                $scope.model.annee = 0;
                $scope.model.tauxNominal = 0;
                $scope.model.tauxAssurance = 0;
                $scope.model.amortissements = [];
            };
        }
    };

});

