describe('api', function () {

    beforeEach(angular.mock.module('api'));

    let  $httpBackend, $q, apiService;

    beforeEach(inject(function( _apiService_, $injector){
        $httpBackend = $injector.get('$httpBackend');
        $q = $injector.get('$q');
        apiService =_apiService_;

        jasmine.getJSONFixtures().fixturesPath = 'base/test';

        let department = getJSONFixture('department-mock.json');
        $httpBackend.when('GET', 'department').respond(200, department);
    }));

});