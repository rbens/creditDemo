import CreditModel from './credit.model';
import zenscroll from "zenscroll";

function creditService($rootScope, $http, $timeout, $filter, $document, notaryFeesService, apiService) {
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
                        apiService.getAmortization({
                            months: creditModel.credit.annee * 12 + "",
                            capital: creditModel.credit.capital,
                             interestRate: tauxNominal,
                            insuranceRate: creditModel.credit.tauxAssurance
                        }).then((response) => {
                            let getNotaryFrees = notaryFeesService.getNotaryFeesModel() ? notaryFeesService.getNotaryFeesModel().total : 0;
                            //noinspection JSUnresolvedVariable
                            creditModel.buildCreditFrom(response.data, getNotaryFrees, $filter);
                        });
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