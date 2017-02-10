angular.module('mainApp').directive('tabResult', function ($filter) {
    return {
        restrict : 'E',
        templateUrl : 'directive/tabResult/tabResult.html',
        link:function(scope,element,attrs,fn){

            scope.$watch('model.amortissements',function(){
                if(scope.model.amortissements){
                    $('.tabLine').remove();
                    angular.forEach(scope.model.amortissements,function(val,key){
                        $('tbody').append(
                            '<tr class="tabLine"><td>'+val.currentMonth +' </td>'+
                            '<td>'+$filter('number')(val.interestAmount,2)   +' € </td>'+
                            '<td>'+$filter('number')(val.principalAmount,2)  +' € </td>'+
                            '<td>'+$filter('number')(val.insuranceAmount,2)  +' € </td>'+
                            '<td>'+$filter('number')(val.owingAmount,2) +' € </td></tr>');
                    });
                }
            },true);
        },
        controller : [function(){

        }
        ]

    };
});
