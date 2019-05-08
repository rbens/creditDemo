import './cities.service';

describe('cities service ',function() {


    beforeEach(angular.mock.module('cities'));

    describe('retrieve cities', function () {
        
        let $httpBackend;

        beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
            }
        ));
        
        it('with http request',function () {
            
        })
    
    });

});