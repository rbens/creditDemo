import "./mortgageData.component";
import "angular-material";

describe('mortgage data',function () {

    beforeEach(angular.mock.module('mortgageData'));
    beforeEach(angular.mock.module('ngMaterial'));
    beforeEach(angular.mock.module('creditService'));
    beforeEach(angular.mock.module('notaryFees'));
    beforeEach(angular.mock.module('api'));
    beforeEach(angular.mock.module('format'));

    describe('component ', function () {
        let $controller, $compile, $rootScope, $scope, element, $mortgageDataController, $mdDialog, $q;

        beforeEach(inject(function ($injector, _$q_) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $compile = $injector.get('$compile');
            $controller = $injector.get('$componentController');
            $mdDialog = $injector.get('$mdDialog');
            $q = _$q_;


            element = $compile(`<mortgage-data-component></mortgage-data-component>`)($scope);
            $mortgageDataController  = $controller('mortgageDataComponent', { $scope: $scope, $mdDialog: $mdDialog}, null);
        }));


        it('should display mortgage info modal', function () {
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

        it('should display notary fees modal', function () {
            let template = require('./../notaryFees/notaryFees.modal.html');
            let notaryFeesModal = undefined;

            $mdDialog.show = jasmine.createSpy().and.callFake(function() {
                let deferred = $q.defer();
                notaryFeesModal = $compile(template)($scope);
                return deferred.promise;
            });

            element.find('button').eq(1).click();

            expect(notaryFeesModal.find('h2')[0]).toContainText('Informations pour calculer les frais de notaire');
            expect($mdDialog.show).toHaveBeenCalled();
        });

    })

});