export default function tabResultController($scope,$filter, $document){
    'ngInject';
    $scope.$watch('$ctrl.model.model.amortissements',() => {
        if(this.model.model.amortissements){
            $document.find('tbody').find('tr').remove();
            angular.forEach(this.model.model.amortissements,(val,key) => {
                $document.find('tbody').append(
                    '<tr class="tabLine"><td style="width: 10%">'+val.currentMonth +' </td>'+
                    '<td>'+$filter('number')(val.interestAmount,2)   +' € </td>'+
                    '<td>'+$filter('number')(val.principalAmount,2)  +' € </td>'+
                    '<td>'+$filter('number')(val.insuranceAmount,2)  +' € </td>'+
                    '<td>'+$filter('number')(val.owingAmount,2) +' € </td></tr>');
            });
        }
    },true);
}
