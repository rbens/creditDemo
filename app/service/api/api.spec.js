describe('api', function () {

    beforeEach(angular.mock.module('api'));

    let  $httpBackend, $q, apiService;

    beforeEach(inject(function( _apiService_, $injector){
        $httpBackend = $injector.get('$httpBackend');
        $q = $injector.get('$q');
        apiService =_apiService_;

        jasmine.getJSONFixtures().fixturesPath = 'base/test';

        let cities = getJSONFixture('cities-mock.json');
        $httpBackend.when('GET', 'cities').respond(200, cities);
    }));

    it('should return cities', function () {
        let result = apiService.getCities();
        let resolvedValue = undefined;

        // result.$promise.then(function (value) {
        //     resolvedValue = value;
        // });
        //
        // expect(result).toBeDefined();
        //
        // $httpBackend.flush();

    });
});