import './department.service';

describe('department service ', function () {


    beforeEach(angular.mock.module('department'));

    describe('retrieve department', function () {
        let $departmentService, $httpBackend;

        beforeEach(inject(function (_departmentService_, $injector) {
                $departmentService = _departmentService_;
                $httpBackend = $injector.get('$httpBackend');

                jasmine.getJSONFixtures().fixturesPath = 'base/test';

                let department = getJSONFixture('department-mock.json');
                $httpBackend.when('GET', '../department/department.json').respond(200, department);
            }
        ));

        it('with http request', function () {
            let result = $departmentService.loadDepartmentFromJson();
            let resolvedValue = undefined;

            result.get().$promise.then(function (value) {
                resolvedValue = value;
            });

            expect(result).toBeDefined();

            $httpBackend.flush();
            expect(resolvedValue).toBeDefined();
            expect(resolvedValue.departments.length).not.toBe(0);
            expect(resolvedValue.departments).toEqual(jasmine.arrayContaining(
                [{
                    "26": "Drôme"
                }]
            ));


        });

    });

});