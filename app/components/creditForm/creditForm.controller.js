export default function creditFormController($rootScope, $filter, $timeout, creditService, $mdDialog) {
    'ngInject';
    this.credit = creditService.getDataModel().credit;
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
        creditService.reset();
        this.credit = creditService.getDataModel().credit;
    }
}
