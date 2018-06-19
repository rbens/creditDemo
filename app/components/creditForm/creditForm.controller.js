export default function creditFormController($rootScope, $filter, $timeout, creditService, $mdDialog) {
    'ngInject';
    this.model = creditService.getDataModel().credit;
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
            tauxGlobal: $filter(rate)(0),
            amortissements: [],
            mensualite: $filter(euro)(0),
            interetTotal: $filter(euro)(0),
            assuranceTotal: $filter(euro)(0),
            creditTotal: $filter(euro)(0),
            assurance: $filter(euro)(0),
            remboursementTotal: $filter(euro)(0)
        };
    };
}
