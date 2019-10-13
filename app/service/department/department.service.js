'use strict';
import "angular-resource";

function department($resource) {
    "ngInject";
    return {
        loadDepartmentFromJson : () => $resource('../department/department.json')
    };
}

angular.module('department', ['ngResource']) .factory('departmentService', department);