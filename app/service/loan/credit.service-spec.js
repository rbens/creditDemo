import './credit.service';

describe('credit service ',function() {

    beforeEach(angular.mock.module('creditService'));

    let $service;


    beforeEach(angular.mock.inject(function(_creditService_){
        $service = _creditService_;
    }));

    describe('configuration ', function(){

        it('should init data model ', inject(function($httpBackend){
            let dataModel = {
                credit : {
                    annee : 1,
                    capital : 230000,
                    tauxNominal : 1.3
                }
            };

            jasmine.getJSONFixtures().fixturesPath='base/test';

            $httpBackend.when('POST','amortissements', dataModel).respond(getJSONFixture('data-model-mock.json'));

            console.log($service.calcul());

            $httpBackend.flush();
            let data = $service.getCreditModel();

            expect(data).isDefined();

        }));


        it('should get market rate', inject(function($httpBackend) {
            let promise = $service.getMarketRates();
            let resolvedValue;

            $httpBackend.when('GET', 'rates')
                .respond(["0,90 %","1,10 %","1,35 %","1,60 %","1,85 %","2,65 %"]);


            promise.then(function(value) { resolvedValue = value; });

            expect(promise).toBeDefined();

            $httpBackend.flush();

            expect(resolvedValue).toBeDefined();
            expect(resolvedValue.data.length).toEqual(6);
        }));
    });
});