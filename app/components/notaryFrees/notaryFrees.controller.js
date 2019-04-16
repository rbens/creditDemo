import "../../service/cities/cities.service";
import notaryFreesService from "./notaryFrees.service";

function notaryFreesController(cityService, notaryFreesService, $timeout) {
    'ngInject';
    let isZipFormat = (query) => query.match(new RegExp('\^[1-9]+'));
    let self = this;

    self.notaryFreesInfo = notaryFreesService.notaryFreesInfo;

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

    self.valid = () => self.notaryFreesInfo.cost && self.notaryFreesInfo.propertyType && self.notaryFreesInfo.localite;

    self.calcul = () => this.cgPromise = $timeout(() => {
        notaryFreesService.notaryFreesCompute(self.notaryFreesInfo).then(
            (res)   => {
                self.notaryFreesInfo.price = res.data.data.general.total
            },
            (error) => console.error(error)
        );
    }, 1500);


}

angular.module('notaryFrees', ['cities'])
    .service('notaryFreesService', notaryFreesService)
    .controller('notaryFreesController', notaryFreesController);