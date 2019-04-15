import "../../service/cities/cities.service";

function notaryFreesController($scope, cityService) {

    let isZipFormat = (query) => query.match(new RegExp('\^[1-9]+'));
    let self = $scope;

    self.notaryFreesInfo = {
        cost: '',
        propertyType: '',
        zip: ''
    };

    self.propertiesType = ['ancien', 'neuf'];

    let cityOrCodeFilter = (query, res) => isZipFormat(query) ? res.code.toString() : res.city.toLocaleLowerCase();

    let applyQueryFilterOnCities = (query) => self.cities ? self.cities.then((res) => res.filter(value => cityOrCodeFilter(query,value).includes(query.toLocaleLowerCase()))) : [];

    let initCities = (query) => self.cities = cityService.getCities(!isZipFormat(query) ? query : null, isZipFormat(query) ? query : null).then(
        // the service could not be available
        (res) =>  res.data.cities,
        // so error is raised and replace response by json file data
        () => cityService.loadCitiesFromJson().get().$promise.then((res) => res)
    );

    self.querySearch = (query) => query.length === 2 ?  initCities(query) : applyQueryFilterOnCities(query);

}

angular.module('notaryFrees', ['cities']).controller('notaryFreesController', notaryFreesController);