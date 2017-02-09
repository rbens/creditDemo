/**
 * Created by rbenseghir on 11/27/14.
 */
angular.module('mainApp').directive('numeric', function ($filter) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var oldValue;
            //noinspection JSUnresolvedVariable
            scope.$watch(attrs.numeric, function (value) {
                var number = $filter('number')(value, '0') ? $filter('number')(value, '0') : [];
                if (number.length === 0) {
                    element.val(oldValue);
                } else {
                    oldValue = value;
                }
            });
        }

    };
});