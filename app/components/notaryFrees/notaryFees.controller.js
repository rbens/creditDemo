import "../../service/cities/cities.service";
import notaryFeesService from "./notaryFees.service";

function notaryFeesController(cityService, notaryFreesService, $timeout) {
    'ngInject';
    let isZipFormat = (query) => query.match(new RegExp('\^[1-9]+'));
    let self = this;

    self.notaryFeesInfo = notaryFreesService.notaryFeesInfo;

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

    self.valid = () => self.notaryFeesInfo.cost && self.notaryFeesInfo.propertyType && self.notaryFeesInfo.localite;

    self.getPrice = () => this.cgPromise = $timeout(() => {
        notaryFreesService.notaryFeesDetailsRequest(self.notaryFeesInfo).then(
            (res)   => {
                let result = res.data.data.general;
                notaryFreesService.setNotaryFeesModel(result.notary_fees_taxes_included, result.taxes, result.formalities_disbursements);
                self.price = notaryFreesService.getNotaryFeesModel().total;
            },
            (error) => console.error(error)
        );
    }, 1500);


}

angular.module('notaryFrees', ['cities'])
    .service('notaryFreesService', notaryFeesService)
    .controller('notaryFreesController', notaryFeesController);