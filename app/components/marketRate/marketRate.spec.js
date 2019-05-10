import './marketRate.component';
import "angular-material";

describe('market rate', function () {

    beforeEach(angular.mock.module('api'));
    beforeEach(angular.mock.module('ngMaterial'));
    beforeEach(angular.mock.module('creditService'));
    beforeEach(angular.mock.module('notaryFees'));
    beforeEach(angular.mock.module('marketRate'));

    let  $httpBackend, $compile, $rootScope, $controller, $scope;

    beforeEach(inject(function( _apiService_, $injector){
        $controller = $injector.get('$controller');
        $compile = $injector.get('$compile');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope =  $rootScope.$new();

        $httpBackend.when('GET', 'rates')
            .respond(["0,90 %","1,10 %","1,35 %","1,60 %","1,85 %","2,65 %"]);
    }));

    it('should get market rate', inject(function($httpBackend) {
        let $marketRateController = $controller('marketRateController as market', { $scope: $scope});

        $httpBackend.flush();
        expect($marketRateController.rates).toBeDefined();
        expect($marketRateController.rates.length).toEqual(6);
    }));

    it('should compile template', function () {

        let element = $compile("<market-rate-component></market-rate-component>")($rootScope);
        $rootScope.$digest();

        $httpBackend.flush();
        expect(element.html()).toBeDefined();
        expect(element.html()).toContain('1,35 %');

    })
});