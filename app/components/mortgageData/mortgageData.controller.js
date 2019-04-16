export default function creditFormController($rootScope, $filter, $timeout, creditService, $mdDialog, notaryFreesService) {
    'ngInject';
    let self = this;
    this.credit = creditService.getDataModel().credit;
    this.notaryFreesInfo = notaryFreesService.notaryFreesInfo;
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
            template : require('../notaryFrees/notaryFrees.modal.html'),
            targetEvent:ev,
            controller: 'notaryFreesController',
            controllerAs: 'ctrl',
            clickOutsideToClose:true,
            onRemoving: this.addNotaryFree
        });

    };

    this.addNotaryFree = () => {
        this.credit.capital += this.notaryFreesInfo.price;
        this.calcul();
    };

    this.reset = () => {
        creditService.reset();
        this.credit = creditService.getDataModel().credit;
        this.notaryFreesInfo.price = 0;
    };

    this.enabled = () => {
        return this.credit.annee && this.credit.tauxNominal && this.credit.capital;
    }
}
