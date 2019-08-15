import "../../service/cities/cities.service";
import notaryFeesService from "./notaryFees.service";
import NotaryFeesModel from "./notaryFees.model";

function notaryFeesController(apiService, cityService, notaryFeesService, $timeout, $mdDialog) {
    'ngInject';
    let isZipFormat = (query) => query.match(new RegExp('\^[1-9]+'));
    let self = this;

    self.notaryFeesInfo = notaryFeesService.notaryFeesInfo;

    self.propertiesType = ['ancien', 'neuf'];

    let cityOrCodeFilter = (query, res) => isZipFormat(query) ? res.code.toString() : res.city.toLocaleLowerCase();

    let applyQueryFilterOnCities = (query) => self.cities ? self.cities.then((res) => res.filter(value => cityOrCodeFilter(query,value).includes(query.toLocaleLowerCase()))) : [];

    let initCities = (query) => self.cities = apiService.getCities(!isZipFormat(query) ? query : null, isZipFormat(query) ? query : null).then(
        // the service could not be available
        (res) =>  res.data.cities,
        // so error is raised and replace response by json file data
        () => cityService.loadCitiesFromJson().get().$promise.then((res) => res)
    );

    self.querySearch = (query) => query.length === 2 ?  initCities(query) : applyQueryFilterOnCities(query);

    self.assignTo = (location) => self.notaryFeesInfo.code = location.code;

    self.valid = () => self.notaryFeesInfo.cost && self.notaryFeesInfo.propertyType && self.notaryFeesInfo.code;

    self.getPrice = (price) => this.cgPromise = $timeout(() => {
        self.notaryFeesInfo.code = self.localite.code;
        apiService.getNotaryFees(self.notaryFeesInfo).then(
            (res)   => {
                let result = res.data;
                notaryFeesService.setNotaryFeesModel(new NotaryFeesModel(result.notaryCostPart, result.totalTax, result.outOfPocketExpense));
                self.price = notaryFeesService.getNotaryFeesModel().total;
                $mdDialog.hide(price);
            },
            (error) => console.error(error)
        );
    }, 1500);


}

angular.module('notaryFees', ['cities'])
    .service('notaryFeesService', notaryFeesService)
    .controller('notaryFeesController', notaryFeesController);