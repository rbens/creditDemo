import './credit.service';
import './../../service/api/api.service';
import './../../components/notaryFees/notaryFees.controller';
import CreditModel from "./credit.model";

describe('credit service ',function() {


    beforeEach(angular.mock.module('api'));
    beforeEach(angular.mock.module('notaryFees'));
    beforeEach(angular.mock.module('creditService'));

    let $creditService , $notaryFeesService, $httpBackend, $apiService, $rootScope;
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
        $rootScope = $injector.get('$rootScope');

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
            result.then((value) => data = value.data);


            $httpBackend.flush();

            expect(data).toBeDefined();
            expect(data.capital).toEqual(250000);

        }));


       it('should calcul', inject(($timeout) => {
           let result = $apiService.getAmortization(dataModel);
           let data = undefined;
           let credit = new CreditModel({},{},{},{});
           credit.annee = 12;
           credit.tauxNominal = 0.7;

           spyOn($apiService,'getAmortization').and.callFake(function () {
                   let deferred = $q.defer();
                   deferred.resolve(result);
                   return deferred.promise;
               }
           );

           $httpBackend.expectPOST('amortissements');
           expect(result).toBeDefined();

           result.then(function(value) { data = value.data; });

           $creditService.calcul();

           $httpBackend.flush();

           credit.creditModel(data);
           expect(data).toBeDefined();
           expect(data.coutPrincipal).toBeDefined();

           $creditService.setCreditModel(data);

           expect(credit.isComplete).toBeTruthy();
       }))
    });
});