export default function tabResultController($scope,$filter, $document){
    'ngInject';
    $scope.$watch('$ctrl.model.amortissements',() => {
        if(this.model.amortissements){
            $document.find('tbody').find('tr').remove();
            angular.forEach(this.model.amortissements,(val) => {
                $document.find('tbody').append(
                    `<tr class="tabLine">
                     <td style="width: 10%">${val.currentMonth} </td>
                     <td>${$filter('number')(val.interestAmount, 2)} € </td>
                     <td>${$filter('number')(val.principalAmount, 2)} € </td>
                     <td>${$filter('number')(val.insuranceAmount, 2)} € </td>
                     <td>${$filter('number')(val.owingAmount, 2)} € </td>
                     </tr>`);
            });
        }
    },true);
}
