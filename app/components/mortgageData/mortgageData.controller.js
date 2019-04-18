export default function creditFormController($rootScope, $filter, $timeout, creditService, $mdDialog, notaryFreesService) {
    'ngInject';

    this.credit = creditService.getCreditModel().credit;

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
            template : require('../notaryFrees/notaryFees.modal.html'),
            targetEvent:ev,
            controller: 'notaryFreesController',
            controllerAs: 'ctrl',
            clickOutsideToClose:true,
            onRemoving: this.addNotaryFreeToAmount
        });

    };

    this.addNotaryFreeToAmount = () => {
        this.notaryFeesInfo = notaryFreesService.getNotaryFeesModel();
        this.calcul();
    };

    this.reset = () => {
        creditService.reset();
        this.credit = creditService.getCreditModel().credit;
        this.notaryFeesInfo.price = 0;
    };

    this.enabled = () => {
        return this.credit.annee && this.credit.tauxNominal && this.credit.capital;
    }
}
