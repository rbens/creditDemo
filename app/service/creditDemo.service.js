import DataModel from './DataModel';
import _ from 'lodash';

export default function creditService($rootScope, $http, $timeout, $filter, $q, $document) {
    'ngInject';
    let dataModel = new DataModel({},{},{},{});
    let formatNumber = (data) => $filter('number')(data, 2);
    let getAmortization = (credit) => $http.post("amortissements", credit);
    let scrollTo = () => {
        let someElement = angular.element(document.getElementById('results'));
        $document.scrollToElement(someElement, -450, 1000);
    };

    return  {
        getMarketRates : () => $http.get("rates"),
        getDataModel: () => dataModel,
        setDataModel: (model) => {
            _.merge(dataModel.credit, model);
        },
        calcul : () => {
            $timeout.cancel($rootScope.cgPromise);
                if (dataModel.isComplete()) {
                    let tauxNominal = dataModel.credit.tauxNominal !== 0 ? dataModel.credit.tauxNominal : dataModel.credit.tauxGlobal;
                    if (screen.width < 660) {
                        scrollTo();
                    }
                    $rootScope.cgPromise = $timeout( () => {
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
        teg : () => {
            dataModel.credit.tauxNominal = Number(formatNumber(dataModel.credit.tauxNominal));
            if (dataModel.credit.tauxAssurance) {
                dataModel.credit.tauxAssurance = Number(formatNumber(dataModel.credit.tauxAssurance));
                dataModel.credit.tauxGlobal = dataModel.credit.tauxNominal + dataModel.credit.tauxAssurance;
            } else {
                dataModel.credit.tauxGlobal = dataModel.credit.tauxNominal;
            }
        },
        reset : () => {
            dataModel.credit = {
                capital: '',
                annee: '',
                tauxNominal: '',
                tauxAssurance: '',
                tauxGlobal: $filter('rate')(0),
                amortissements: [],
                mensualite: $filter('euro')(0),
                interetTotal: $filter('euro')(0),
                assuranceTotal: $filter('euro')(0),
                creditTotal: $filter('euro')(0),
                assurance: $filter('euro')(0),
                remboursementTotal: $filter('euro')(0)
            };
        }
    };
}
