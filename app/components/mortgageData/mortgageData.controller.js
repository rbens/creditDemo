export default function creditFormController($rootScope, $filter, $timeout, creditService, $mdDialog) {
    'ngInject';
    this.credit = creditService.getDataModel().credit;
    this.calcul = () => creditService.calcul();
    this.teg = () => creditService.teg();

    this.modalForm = (ev) => {
        $mdDialog.show({
            parent: angular.element(document.body),
            template : require('./mortgageInfo.modal.html'),
            targetEvent:ev,
            clickOutsideToClose:true
        }).then(
            () => this.status = 'cancel',
            () => this.status = 'close'
        );
    };

    this.notaryFreesModal = (ev) => {
        $mdDialog.show({
            parent: angular.element(document.body),
            template : require('./../notaryFrees/notaryFrees.html'),
            targetEvent:ev,
            controller: 'notaryFreesController'
        });
    };

    this.reset = () => {
        creditService.reset();
        this.credit = creditService.getDataModel().credit;
    };

    this.enabled = () => {
        return this.credit.annee && this.credit.tauxNominal && this.credit.capital;
    }
}
