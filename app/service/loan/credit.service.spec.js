import './credit.service';
import './../../service/api/api.service';
import './../../components/notaryFees/notaryFees.controller';

describe('credit service ',function() {


    beforeEach(angular.mock.module('api'));
    beforeEach(angular.mock.module('notaryFees'));
    beforeEach(angular.mock.module('creditService'));

    let $creditService , $notaryFeesService, $httpBackend, $apiService;


    beforeEach(angular.mock.inject(function(_creditService_, _notaryFeesService_, _apiService_, $injector){
        let dataModel = {
            credit : {
                annee : 1,
                capital : 230000,
                tauxNominal : 1.3
            }
        };

        $creditService = _creditService_;
        $notaryFeesService = _notaryFeesService_;
        $apiService = _apiService_;
        $httpBackend = $injector.get('$httpBackend');

        jasmine.getJSONFixtures().fixturesPath='base/test';

        let dataMock = getJSONFixture('data-model-mock.json');
        $httpBackend.when('POST','/amortissements', dataModel).respond(200,dataMock);
    }));

    describe('configuration ', function(){

        it('should init data model ', inject(function(){


            $httpBackend.expectPOST('/amortissements');



            let data = $creditService.getCreditModel();
            // $httpBackend.flush();

            expect(data).toBeDefined();
            console.log(data.credit);
        }));


        it('should get market rate', inject(function($httpBackend) {
            let promise = $apiService.getMarketRates();
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