export default function creditResultController($scope,$mdDialog) {
        'ngInject';
        this.modalResult = (ev) => {
            $mdDialog.show({
                title:'Informations sur les résultats',
                parent: angular.element(document.body),
                template : require('./infoCreditResult.html'),
                targetEvent:ev,
                clickOutsideToClose:true
            }).then(
                () => this.status = 'cancel',
                () => this.status = 'close'
            );
        };
}