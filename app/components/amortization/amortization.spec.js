import "./amortization.component";
import "angular-material";

describe('amortization',function () {

    beforeEach(angular.mock.module('amortization'));
    beforeEach(angular.mock.module('ngMaterial'));
    beforeEach(angular.mock.module('format'));

    describe('component ', function () {
        let $controller, $compile, $rootScope, $scope, element, $httpBackend, $amortizationController, $mdDialog, $q, data;

        beforeEach(inject(function ($injector, _$q_) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $compile = $injector.get('$compile');
            $controller = $injector.get('$componentController');
            $mdDialog = $injector.get('$mdDialog');
            $q = _$q_;

            //http mock with json response
            $httpBackend = $injector.get('$httpBackend');
            jasmine.getJSONFixtures().fixturesPath = 'base/test';

            data = getJSONFixture('data-model-mock.json');
            $httpBackend.when('POST', 'amortissements').respond(200, data);

            $scope.credit = data;

            element = $compile(`<amortization-component  model="credit"></amortization-component>`)($scope);
            $amortizationController  = $controller('amortizationComponent', { $scope: $scope, $mdDialog: $mdDialog}, null);
            $amortizationController.model = {};
        }));

        it('should display amortization info modal', function () {
            let $mdDialogOpened = false;

            $mdDialog.show = jasmine.createSpy().and.callFake(function() {
                let deferred = $q.defer();
                $mdDialogOpened = true;
                return deferred.promise;
            });

            element.find('button').eq(0).click();

            expect($mdDialog.show).toHaveBeenCalled();
            expect($mdDialogOpened).toBeTruthy();
        });

        it('should display mensualite', function () {
            // $amortizationController.model = $scope.credit ;
            $scope.$apply($amortizationController.model.amortissements = data.credit );
            expect(element.html()).toBeDefined();
        });

    });

});