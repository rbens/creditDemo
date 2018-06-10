export default function tabResultController($scope,$filter, $document){
    $scope.$watch('model.amortissements',function(){
        if($scope.model.amortissements){
            $document.find('tbody').find('tr').remove();
            angular.forEach($scope.model.amortissements,function(val,key){
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
