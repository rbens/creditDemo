angular.module('mainApp').directive('spinnerLoading', function () {
    return {
        restrict : 'E',
        templateUrl : 'directive/spinnerLoading/spinnerLoading.html',
        scope :{
            promise: '@'
        },
        link:function(scope,element,attrs,fn){
            console.log(scope.promise);
        },
        controller : [function(){

        }
        ]

    };
});
