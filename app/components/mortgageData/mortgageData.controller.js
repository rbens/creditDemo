export default function creditFormController($filter, $timeout, creditService, $mdDialog) {
    'ngInject';

    let self = this;

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
            template : require('../notaryFees/notaryFees.modal.html'),
            targetEvent:ev,
            controller: 'notaryFeesController',
            clickOutsideToClose:true,
            controllerAs: 'ctrl',
        }).then(function(price) {
            self.calcul();
        }, function() {
            console.log('not price');
        });
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
