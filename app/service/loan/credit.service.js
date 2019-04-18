import CreditModel from './credit.model';

export default function creditService($rootScope, $http, $timeout, $filter, $q, $document, notaryFreesService) {
    'ngInject';
    let creditModel = new CreditModel({}, {}, {}, {});
    let getAmortization = (credit) => $http.post("amortissements", credit);
    let scrollTo = () => {
        let someElement = angular.element(document.getElementById('results'));
        $document.scrollToElement(someElement, -750, 1000);
    };

    return {
        getMarketRates: () => $http.get("rates"),
        getCreditModel: () => creditModel,
        setCreditModel: (model) => Object.assign(creditModel.credit, model),
        calcul: () => {
            $timeout.cancel($rootScope.cgPromise);
            if (creditModel.isComplete()) {
                let tauxNominal = creditModel.credit.tauxNominal !== 0 ? creditModel.credit.tauxNominal : creditModel.credit.tauxGlobal;
                if (screen.width < 660) {
                    scrollTo();
                }
                $rootScope.cgPromise = $timeout(() => {
                    $q.all([
                        getAmortization({
                            months: creditModel.credit.annee * 12 + "",
                            capital: creditModel.credit.capital + (notaryFreesService.getNotaryFeesModel() ? notaryFreesService.getNotaryFeesModel().total : 0),
                            interestRate: tauxNominal,
                            insuranceRate: creditModel.credit.tauxAssurance
                        }).then((response) => {
                            let data = response.data;
                            //noinspection JSUnresolvedVariable
                            if (data.coutPrincipal) {
                                creditModel.credit.amortissements = data.writeDowns;
                                creditModel.credit.assurance = $filter('euro')(data.coutAssurance);
                                creditModel.credit.mensualite = $filter('euro')(data.monthlyAmount);
                                creditModel.credit.interetTotal = $filter('euro')(data.interestTotalCost);
                                creditModel.credit.assuranceTotal = $filter('euro')(data.insuranceTotalCost);
                                creditModel.credit.creditTotal = $filter('euro')(data.creditTotalCost);
                                creditModel.credit.remboursementTotal = $filter('euro')(data.owingTotalCost);

                                let last = (data.writeDowns.length - 1);
                                creditModel.addSeries(data.interetSeries, data.assuranceSeries, data.creditSeries, data.capitalRestantSeries, data.totalRestantSeries);
                                creditModel.addSeriesToPieChart(data.interetSeries[last], data.assuranceSeries[last], creditModel.credit.capital, notaryFreesService.getNotaryFeesModel() ? notaryFreesService.getNotaryFeesModel().total : 0);
                            }
                        })
                    ]);
                }, 1500);
            }
        },
        teg: () => creditModel.teg(),
        reset: () => creditModel.reset($filter)
    };
}

angular.module('creditService', []).factory('creditService', creditService);