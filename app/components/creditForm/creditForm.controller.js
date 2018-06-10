export default function creditFormController($scope, $filter, $timeout, creditService, $mdDialog) {
    'ngInject';
    $scope.model = creditService.getDataModel().model;


    $scope.calcul = function () {
        creditService.calcul();
    };

    $scope.teg = function(){
        creditService.teg();
    };



    $scope.modalForm =  function(ev) {
        $mdDialog.show({
            parent: angular.element(document.body),
            template : require('./infoCreditForm.html'),
            targetEvent:ev,
            clickOutsideToClose:true
        }).then(
            () => $scope.status = 'cancel',
            () => $scope.status = 'close'
        );
    };

    $scope.reset = function(){
        $scope.model.capital = undefined;
        $scope.model.annee = undefined;
        $scope.model.tauxNominal = undefined;
        $scope.model.tauxAssurance = undefined;
        $scope.model.tauxGlobal = 0;
        $scope.model.amortissements = [];
        $scope.model.mensualite = creditService.formatNumber(0).concat(' €');
        $scope.model.interetTotal = creditService.formatNumber(0).concat(' €');
        $scope.model.assuranceTotal = creditService.formatNumber(0).concat(' €');
        $scope.model.creditTotal = creditService.formatNumber(0).concat(' €');
        $scope.model.assurance = creditService.formatNumber(0).concat(' €');
        $scope.model.remboursementTotal = creditService.formatNumber(0).concat(' €');
    };
}
