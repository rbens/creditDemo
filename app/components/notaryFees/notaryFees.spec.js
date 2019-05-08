import './notaryFees.controller';
import NotaryFeesModel from "./notaryFees.model";

describe('notary fees ',function() {


    beforeEach(angular.mock.module('notaryFees'));

    describe('service create model object ', function(){
        let notaryFeesModel = new NotaryFeesModel(3000,10000,1500);
        let  $notaryFeesService;

        beforeEach(inject(function(_notaryFeesService_){
            $notaryFeesService = _notaryFeesService_;
        }));

        it('and check values', function () {
            $notaryFeesService.setNotaryFeesModel(notaryFeesModel);
            expect($notaryFeesService.getNotaryFeesModel()).toBeDefined();
            expect($notaryFeesService.getNotaryFeesModel().taxes).toBe(10000);
            expect($notaryFeesService.getNotaryFeesModel().disbursements).toEqual(1500);
            expect($notaryFeesService.getNotaryFeesModel().notaryTaxes).toEqual(3000);
        });

        it('and check total', function(){
            $notaryFeesService.setNotaryFeesModel(notaryFeesModel);
            expect($notaryFeesService.getNotaryFeesModel().total).toEqual(14500);
        });

    });

    describe('with controller ', function(){
        let $controller, $rootScope, cityService, $mdDialog, $scope, apiService;

        beforeEach(inject(function($injector) {
            $controller = $injector.get('$controller');
            $rootScope  = $injector.get('$rootScope');
            $scope = $rootScope.$new();
        }));

        it('and test zip format', function () {
            // let $scope = $rootScope.$new();
            let $notaryFreesController = $controller('notaryFeesController', { $scope: $scope , apiService: apiService, cityService: cityService, $mdDialog: $mdDialog});

            $notaryFreesController.notaryFeesInfo = {
                cost : 120000,
                propertyType : 'ancien',
                localite : '95370'
            };


            expect($notaryFreesController).toBeDefined();
            expect($notaryFreesController.valid()).toBeTruthy();

        })

    });


});