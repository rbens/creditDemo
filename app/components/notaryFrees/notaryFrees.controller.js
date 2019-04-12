import citiesService from "../../service/cities/cities.service";

export default function notaryFreesController($scope, cityService) {
    $scope.notaryFreesInfo = {
        cost: '',
        propertyType: '',
        zip: ''
    };

    cityService.get().$promise.then((res) => $scope.cities = res.cities);

    $scope.querySearch = querySearch;

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        return query ? $scope.cities.filter(city => city.toLocaleLowerCase().includes(query)) : $scope.cities;
    }

}

angular.module('notaryFrees', []) .factory('cityService', citiesService).controller('notaryFreesController', notaryFreesController);