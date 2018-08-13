describe('credit service ',function() {

    beforeEach(angular.mock.module('mainApp'));

    var $service;

    beforeEach(angular.mock.inject(function(_configService_){
        $service = _configService_;
    }));

    describe('configuration ', function(){

        it('should be defined ', function(){
            expect($service).toBeDefined();
        });


        it('should simulate promise', inject(function($q, $rootScope, $httpBackend) {
            // let deferred = $q.defer();
            // let promise = $service.get().$promise;
            // let resolvedValue;
            // jasmine.getFixtures().fixturesPath = 'config';
            // let valid_respond = getJSONFixture('config.json');
            // $httpBackend.whenGET(/.*/).respond(valid_respond);
            //
            // promise.then(function(value) { resolvedValue = value; });
            // expect(resolvedValue).toBeUndefined();
            //
            // // Simulate resolving of promise
            // deferred.resolve(123);
            // // Note that the 'then' function does not get called synchronously.
            // // This is because we want the promise API to always be async, whether or not
            // // it got called synchronously or asynchronously.
            // expect(resolvedValue).toBeUndefined();
            //
            // // Propagate promise resolution to 'then' functions using $apply().
            // $rootScope.$apply();
            // expect(resolvedValue).toEqual(123);
        }));
    });
});