describe('numeric test', function () {
    var $scope,element;

    beforeEach(module('mainApp'));

    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
        element = angular.element('<input type="text" numeric="{{capital}}" value="{{capital}}"/>');
    }));

    it('should get the correct value', inject(function ($compile, $rootScope) {
        $scope.capital = '20';
        $compile(element)($scope);
        $rootScope.$digest();
        expect(element).not.toBe(undefined);
        expect(element.val()).toBe('20');
    }));

    it('should get the empty value', inject(function ($compile, $rootScope){
        $scope.capital = 'p230';
        $compile(element)($scope);
        $rootScope.$digest();
        expect(element).not.toBe(undefined);
        expect(element.val()).toBe('');
    }));
});