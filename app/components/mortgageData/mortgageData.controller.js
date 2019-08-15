export default function mortgageDataController($filter, $timeout, creditService, $mdDialog) {
    'ngInject';

    let self = this;
    let creditModel = creditService.getCreditModel();

    this.credit = creditModel.credit;

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
            console.error('Problem with service for getting price');
        });
    };

    this.reset = () => {
        creditService.reset();
        this.credit = creditModel.credit;
        this.notaryFeesInfo.price = 0;
    };

    this.enabled = () => {
        return this.credit.annee && this.credit.tauxNominal && this.credit.capital;
    }
}
