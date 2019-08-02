import CreditModel from './credit.model';
import zenscroll from "zenscroll";

function creditService($rootScope, $http, $timeout, $filter, $q, $document, notaryFeesService, apiService) {
    'ngInject';
    let creditModel = new CreditModel({}, {}, {}, {});
    let scrollTo = (id) => {
        let someElement = document.getElementById(id);
        zenscroll.center(someElement, 500);
    };

    return {
        getCreditModel: () => creditModel,
        setCreditModel: (model) => Object.assign(creditModel.credit, model),
        calcul: () => {
            $timeout.cancel($rootScope.cgPromise);
            if (creditModel.isComplete()) {
                let tauxNominal = creditModel.credit.tauxNominal !== 0 ? creditModel.credit.tauxNominal : creditModel.credit.tauxGlobal;
                if (screen.width < 660) {
                    scrollTo('mortgageResult');
                }
                $rootScope.cgPromise = $timeout(() => {
                    $q.all([
                        apiService.getAmortization({
                            months: creditModel.credit.annee * 12 + "",
                            capital: creditModel.credit.capital + (notaryFeesService.getNotaryFeesModel() ? notaryFeesService.getNotaryFeesModel().total : 0),
                            interestRate: tauxNominal,
                            insuranceRate: creditModel.credit.tauxAssurance
                        }).then((response) => {
                            let data = response.data;
                            let getNotaryFrees = notaryFeesService.getNotaryFeesModel() ? notaryFeesService.getNotaryFeesModel().total : 0;
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
                                creditModel.addSeriesToPieChart(data.interetSeries[last], data.assuranceSeries[last], creditModel.credit.capital, getNotaryFrees);
                            }
                        })
                    ]);
                }, 1500);
            }
        },
        teg: () => creditModel.teg(),
        reset: () => {
            creditModel.reset($filter);
            scrollTo('mortgageData');
        }
    };
}

angular.module('creditService', []).factory('creditService', creditService);