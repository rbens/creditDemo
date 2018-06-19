export default function tabResultController($rootScope, $scope,$filter, $document){
    'ngInject';
    $scope.$watch('$ctrl.model.amortissements',() => {
        if(this.model.amortissements){
            $document.find('tbody').find('tr').remove();
            angular.forEach(this.model.amortissements,(val) => {
                $document.find('tbody').append(
                    `<tr class="tabLine">
                     <td style="width: 10%">${val.currentMonth} </td>
                     <td>${$filter('euro')(val.interestAmount)} </td>
                     <td>${$filter('euro')(val.principalAmount)}</td>
                     <td>${$filter('euro')(val.insuranceAmount)} </td>
                     <td>${$filter('euro')(val.owingAmount)} </td>
                     </tr>`);
            });
        }
    },true);

    this.$doCheck = () => this.cgPromise = $rootScope.cgPromise;
}
