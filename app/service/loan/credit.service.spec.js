import './credit.service';
import './../../service/api/api.service';
import './../../components/notaryFees/notaryFees.controller';

describe('credit service ',function() {


    beforeEach(angular.mock.module('api'));
    beforeEach(angular.mock.module('notaryFees'));
    beforeEach(angular.mock.module('creditService'));

    let $creditService , $notaryFeesService, $httpBackend, $apiService;
    let dataModel = {
        credit : {
            annee : 1,
            capital : 230000,
            tauxNominal : 1.3
        }
    };


    beforeEach(angular.mock.inject(function(_creditService_, _notaryFeesService_, _apiService_, $injector){


        $creditService = _creditService_;
        $notaryFeesService = _notaryFeesService_;
        $apiService = _apiService_;
        $httpBackend = $injector.get('$httpBackend');

        jasmine.getJSONFixtures().fixturesPath='base/test';

        let dataMock = getJSONFixture('data-model-mock.json');
        $httpBackend.when('POST','amortissements', dataModel).respond(200,dataMock);
    }));

    describe('configuration ', function(){

        it('should init data model ', inject(function(){
            let result = $apiService.getAmortization(dataModel);
            let data = undefined;

            $httpBackend.expectPOST('amortissements');
            expect(result).toBeDefined();

            result.then(function(value) { data = value.data; });

            $httpBackend.flush();

            expect(data).toBeDefined();
            expect(data.credit).toBeDefined();
            expect(data.credit.capital).toEqual(240000);

        }));


        describe('configuration ', function(){

        });
    });
});