export default function creditFormController($scope, $filter, $timeout, creditService, $mdDialog) {
    'ngInject';
    this.model = creditService.getDataModel().model;

    this.calcul = () => creditService.calcul();

    this.teg = () => creditService.teg();

    this.modalForm = (ev) => {
        $mdDialog.show({
            parent: angular.element(document.body),
            template : require('./infoCreditForm.html'),
            targetEvent:ev,
            clickOutsideToClose:true
        }).then(
            () => this.status = 'cancel',
            () => this.status = 'close'
        );
    };

    this.reset = () => {
        this.model = {
            capital: undefined,
            annee: undefined,
            tauxNominal: undefined,
            tauxAssurance: undefined,
            tauxGlobal: 0,
            amortissements: [],
            mensualite: formatNumber(0).concat(' €'),
            interetTotal: formatNumber(0).concat(' €'),
            assuranceTotal: formatNumber(0).concat(' €'),
            creditTotal: formatNumber(0).concat(' €'),
            assurance: formatNumber(0).concat(' €'),
            remboursementTotal: formatNumber(0).concat(' €'),
        };
    };
}
