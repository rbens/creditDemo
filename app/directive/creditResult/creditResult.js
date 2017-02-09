angular.module('mainApp').directive('creditResult',function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/directive/creditResult/creditResult.html',
        link: function(scope, element, attrs, fn) {
        },
        controller: [ function() { }]
    };
});