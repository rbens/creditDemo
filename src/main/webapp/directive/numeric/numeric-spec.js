describe('numeric', function () {
    var $scope;

    beforeEach(module('mainApp'));

    beforeEach(inject(function ($rootScope, $directive) {
        $scope = $rootScope.$new();
        $directive('numeric', { $scope: $scope });

    }));

    it('should get the correct message', function () {
        var message = $scope.getMessage('');
        expect(message).toBe('test');
    });
});