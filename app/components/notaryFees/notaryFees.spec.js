import './notaryFees.controller';
import NotaryFeesModel from "./notaryFees.model";

describe('notary fees ',function() {

    beforeEach(angular.mock.module('api'));
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

    describe('controller should ', function(){
        let $notaryFreesController,  apiService, $httpBackend, $mdDialog, departmentService;

        beforeEach(inject(function($injector) {
            let $controller = $injector.get('$controller');
            let $rootScope  = $injector.get('$rootScope');
            let $scope = $rootScope.$new();

            //http mock with json response
            $httpBackend = $injector.get('$httpBackend');
            jasmine.getJSONFixtures().fixturesPath = 'base/test';

            let cities = getJSONFixture('department-mock.json');
            $httpBackend.when('GET', 'department').respond(200, cities);

            //init controller
            $notaryFreesController = $controller('notaryFeesController', { $scope: $scope , apiService: apiService, departmentService: departmentService, $mdDialog: $mdDialog});

        }));

        describe('search department ', function() {

            beforeEach(inject(function(_departmentService_) {
                departmentService = _departmentService_;
                departmentService.loadDepartmentFromJson().then(
                    (res) => {
                        $notaryFreesController.department = res.data.department;
                    }
                );
                $httpBackend.flush();
            }));


        });

        describe('verify notary fees info ', function(){

            let notaryFeesService;

            beforeEach(inject(function(_apiService_, _notaryFeesService_) {
                apiService = _apiService_;
                notaryFeesService = _notaryFeesService_;
                $notaryFreesController.notaryFeesInfo = {
                    cost : 120000,
                    propertyType : 'ancien',
                    code : 95370
                };

                $httpBackend.when('GET', 'real-estate-fees').respond(200, {
                    notaryTaxes : 3000,
                    taxes : 10000,
                    disbursements : 1500
                });


            }));

            it('is valid ',function() {
                expect($notaryFreesController).toBeDefined();
                expect($notaryFreesController.valid()).toBeTruthy();
            });

            it('get price',function() {
                spyOn($notaryFreesController, "getPrice").and.callFake(
                    () =>  apiService.getNotaryFees({
                        params: {
                            'cost': 120000,
                            'propertyType': 'ancien',
                            'zip': 95370
                        }
                    }).then(
                        (res) => {
                            let result = res.data;
                            notaryFeesService.setNotaryFeesModel(new NotaryFeesModel(result.notaryTaxes, result.taxes, result.disbursements));
                            $notaryFreesController.price = notaryFeesService.getNotaryFeesModel().total;
                        }
                    )
                );

                $notaryFreesController.getPrice(255000);


                $httpBackend.flush();

                expect($notaryFreesController.price).toBeDefined();
                expect($notaryFreesController.price).toEqual(14500);
            });

        });



    });


});