export default function mortgageResultController($rootScope, $mdDialog) {
    'ngInject';

    this.$doCheck = () => this.cgPromise = $rootScope.cgPromise;

    this.$onChanges = () => this.taxesPrice = this.taxes.total;

    this.modalResult = (ev) => {
        $mdDialog.show({
            title: 'Informations sur les résultats',
            parent: angular.element(document.body),
            template: require('./mortgageResult.modal.html'),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(
            () => this.status = 'cancel',
            () => this.status = 'close'
        );
    };
}