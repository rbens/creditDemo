import DataModel from './DataModel';

export default function creditService($rootScope, $http, $timeout, $filter, $q, $document) {
    'ngInject';
    let dataModel = new DataModel({}, {}, {}, {});
    let getAmortization = (credit) => $http.post("amortissements", credit);
    let scrollTo = () => {
        let someElement = angular.element(document.getElementById('results'));
        $document.scrollToElement(someElement, -750, 1000);
    };

    return {
        getMarketRates: () => $http.get("rates"),
        getDataModel: () => dataModel,
        setDataModel: (model) => Object.assign(dataModel.credit, model),
        calcul: () => {
            $timeout.cancel($rootScope.cgPromise);
            if (dataModel.isComplete()) {
                let tauxNominal = dataModel.credit.tauxNominal !== 0 ? dataModel.credit.tauxNominal : dataModel.credit.tauxGlobal;
                if (screen.width < 660) {
                    scrollTo();
                }
                $rootScope.cgPromise = $timeout(() => {
                    $q.all([
                        getAmortization({
                            months: dataModel.credit.annee * 12 + "",
                            capital: dataModel.credit.capital,
                            interestRate: tauxNominal,
                            insuranceRate: dataModel.credit.tauxAssurance
                        }).then((response) => {
                            let data = response.data;
                            //noinspection JSUnresolvedVariable
                            if (data.coutPrincipal) {
                                dataModel.credit.amortissements = data.writeDowns;
                                dataModel.credit.assurance = $filter('euro')(data.coutAssurance);
                                dataModel.credit.mensualite = $filter('euro')(data.monthlyAmount);
                                dataModel.credit.interetTotal = $filter('euro')(data.interestTotalCost);
                                dataModel.credit.assuranceTotal = $filter('euro')(data.insuranceTotalCost);
                                dataModel.credit.creditTotal = $filter('euro')(data.creditTotalCost);
                                dataModel.credit.remboursementTotal = $filter('euro')(data.owingTotalCost);

                                let last = (data.writeDowns.length - 1);
                                dataModel.addSeries(data.interetSeries, data.assuranceSeries, data.creditSeries, data.capitalRestantSeries, data.totalRestantSeries);
                                dataModel.addSeriesToPieChart(data.interetSeries[last], data.assuranceSeries[last], data.capital);
                            }
                        })
                    ]);
                }, 1500);
            }
        },
        teg: () => dataModel.teg(),
        reset: () => dataModel.reset($filter)
    };
}

angular.module('creditService', []).factory('creditService', creditService);