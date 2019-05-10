import './cities.service';

describe('cities service ', function () {


    beforeEach(angular.mock.module('cities'));

    describe('retrieve cities', function () {
        let $cityService, $httpBackend;

        beforeEach(inject(function (_cityService_, $injector) {
                $cityService = _cityService_;
                $httpBackend = $injector.get('$httpBackend');

                jasmine.getJSONFixtures().fixturesPath = 'base/test';

                let cities = getJSONFixture('cities-model-mock.json');
                $httpBackend.when('GET', '../cities/cities.json').respond(200, cities);
            }
        ));

        it('with http request', function () {
            let result = $cityService.loadCitiesFromJson();
            let resolvedValue = undefined;

            result.get().$promise.then(function (value) {
                resolvedValue = value;
            });

            expect(result).toBeDefined();

            $httpBackend.flush();
            expect(resolvedValue).toBeDefined();
            expect(resolvedValue.input).toEqual('95');
            expect(resolvedValue.cities.length).not.toBe(0);
            expect(resolvedValue.cities).toEqual(jasmine.arrayContaining(
                [{
                    "code": 95270,
                    "city": "ASNIERES SUR OISE"
                }]
            ));


        });

    });

});