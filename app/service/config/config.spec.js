import './config.service';

describe('config service ', function () {


    beforeEach(angular.mock.module('config'));

    describe('load configuration', function () {
        let $configService, $httpBackend;

        beforeEach(inject(function (_configService_, $injector) {
                $configService = _configService_;
                $httpBackend = $injector.get('$httpBackend');

                jasmine.getJSONFixtures().fixturesPath = 'base/test';

                let config = getJSONFixture('config-mock.json');
                $httpBackend.when('GET', '../config/config.json').respond(200, config);
            }
        ));

        it('and test content', function () {
            let resolvedValue = undefined;

            $configService.get().$promise.then(function (value) {
                resolvedValue = value;
            });

            $httpBackend.flush();
            expect(resolvedValue).toBeDefined();
            expect(resolvedValue.line).toBeDefined();
            expect(resolvedValue.line).toEqual(jasmine.objectContaining({
                "options": {
                    "chart": {
                        "type": "line"
                    },
                    "plotOptions": {
                        "series": {
                            "stacking": ""
                        }
                    }
                }
            }));


        });

    });

});