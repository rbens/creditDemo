import "./mortgageResult.component";
import "angular-material";
import NotaryFeesModel from "../notaryFees/notaryFees.model";

describe('mortgage result',function () {

    beforeEach(angular.mock.module('mortgageResult'));
    beforeEach(angular.mock.module('ngMaterial'));
    beforeEach(angular.mock.module('format'));

    describe('component ', function () {
        let $controller, $compile, $rootScope, $scope, element, $mortgageResultController, $mdDialog, $q;

        beforeEach(inject(function ($injector, _$q_) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $compile = $injector.get('$compile');
            $controller = $injector.get('$componentController');
            $mdDialog = $injector.get('$mdDialog');
            $q = _$q_;

            $scope.credit = {
                model: {
                    mensualite: 1535,
                    interetTotal: 35000,
                    assuranceTotal: 17000,
                    creditTotal: 52000,
                    remboursementTotal: 250000 + this.creditTotal
                }};

            $scope.taxes = new NotaryFeesModel(1900, 20000, 1100);

            element = $compile(`<mortgage-result-component model="credit.model"  taxes="taxes")></mortgage-result-component>`)($scope);
            $mortgageResultController  = $controller('mortgageResultComponent', { $scope: $scope, $mdDialog: $mdDialog}, null);
            $scope.$digest();
        }));



        it('should display notary fees modal', function () {
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
            expect(element.html()).toBeDefined();
            expect(element.html()).toContain('1535');
        });

        it('should display total interest', function () {
            expect(element.html()).toBeDefined();
            expect(element.html()).toContain('35000');
        });

        it('should display total credit', function () {
            expect(element.html()).toBeDefined();
            expect(element.html()).toContain('52000');
        });

        it('should display notary fees credit', function () {
            expect(element.html()).toBeDefined();
            expect(element.html()).toContain('23000');
        });

    })

});