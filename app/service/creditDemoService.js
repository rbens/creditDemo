import DataModel from './DataModel';
import _ from 'lodash';

export default function creditService($http, $timeout, $filter, $q) {
    'ngInject';
    let dataModel = new DataModel({},{},{},{});
    let formatNumber = (data) => $filter('number')(data, 2);
    let getAmortization = (credit) => $http.post("amortissements", credit);

    return  {
        formatNumber: formatNumber,
        getMarketRates : () => $http.get("rates"),
        getDataModel: () => dataModel,
        setDataModel: (model) => {
            _.merge(dataModel.model, model);
        },
        calcul : function () {
            let time = '';
            $timeout.cancel(time);
            time = $timeout( () => {
                if (dataModel.isComplete()) {
                    let tauxNominal = dataModel.model.tauxNominal !== 0 ? dataModel.model.tauxNominal : dataModel.model.tauxGlobal;
                    if (screen.width < 660) {
                        goTo();
                    }
                    $q.all([
                        getAmortization({
                            months: dataModel.model.annee * 12 + "",
                            capital: dataModel.model.capital,
                            interestRate: tauxNominal,
                            insuranceRate: dataModel.model.tauxAssurance
                        }).then((response) => {
                                let data = response.data;
                                //noinspection JSUnresolvedVariable
                                if (data.coutPrincipal) {
                                    dataModel.model.amortissements = data.writeDowns;
                                    dataModel.model.assurance = formatNumber(data.coutAssurance).concat(' €');
                                    dataModel.model.mensualite = formatNumber(data.monthlyAmount).concat(' €');
                                    dataModel.model.interetTotal = formatNumber(data.interestTotalCost).concat(' €');
                                    dataModel.model.assuranceTotal = formatNumber(data.insuranceTotalCost).concat(' €');
                                    dataModel.model.creditTotal = formatNumber(data.creditTotalCost).concat(' €');
                                    dataModel.model.remboursementTotal = formatNumber(data.owingTotalCost).concat(' €');

                                    let last = (data.writeDowns.length - 1);
                                    dataModel.addSeries(data.interetSeries, data.assuranceSeries, data.creditSeries, data.capitalRestantSeries, data.totalRestantSeries);
                                    dataModel.addSeriesToPieChart(data.interetSeries[last], data.assuranceSeries[last], data.capital);
                                }
                            })
                    ]);
                } else {
                    dataModel.model.amortissements = [];
                    dataModel.model.mensualite = formatNumber(0).concat(' €');
                    dataModel.model.interetTotal = formatNumber(0).concat(' €');
                    dataModel.model.assuranceTotal = formatNumber(0).concat(' €');
                    dataModel.model.creditTotal = formatNumber(0).concat(' €');
                    dataModel.model.assurance = formatNumber(0).concat(' €');
                    dataModel.model.remboursementTotal = formatNumber(0).concat(' €');
                }
            }, 2000);
        },
        teg : function() {
            dataModel.model.tauxNominal = Number(formatNumber(dataModel.model.tauxNominal));
            if (dataModel.model.tauxAssurance) {
                dataModel.model.tauxAssurance = Number(formatNumber(dataModel.model.tauxAssurance));
                dataModel.model.tauxGlobal = dataModel.model.tauxNominal + dataModel.model.tauxAssurance;
            } else {
                dataModel.model.tauxGlobal = dataModel.model.tauxNominal;
            }
        }
    };
}
