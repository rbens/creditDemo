import "../../service/department/department.service";
import notaryFeesService from "./notaryFees.service";
import NotaryFeesModel from "./notaryFees.model";

function notaryFeesController(apiService, departmentService, notaryFeesService, $timeout, $mdDialog) {
    'ngInject';
    let self = this;

    self.notaryFeesInfo = notaryFeesService.notaryFeesInfo;

    self.propertiesType = ['ancien', 'neuf'];

    this.$onInit = () =>  departmentService.loadDepartmentFromJson().get().$promise.then((res) => self.department = res.departments);

    self.querySearch = (query) => self.department
        .filter(value =>  Object.keys(value)[0].includes(query))
        .map(value => {
            let location = {};
            for (let [key, val] of Object.entries(value)) {
                Object.assign(location, {code: key, name: val});
            }
            return location;
        });

    self.assignTo = (location) => self.notaryFeesInfo.code = location.code;

    self.valid = () => self.notaryFeesInfo.cost && self.notaryFeesInfo.propertyType && self.notaryFeesInfo.code;

    self.getPrice = (price) => this.cgPromise = $timeout(() => {
        self.notaryFeesInfo.code = self.localite.code;
        apiService.getNotaryFees(self.notaryFeesInfo).then(
            (res)   => {
                let result = res.data;
                notaryFeesService.setNotaryFeesModel(new NotaryFeesModel(result.notaryFees, result.totalTax, result.outOfPocketExpense));
                self.price = notaryFeesService.getNotaryFeesModel().total;
                $mdDialog.hide(price);
            },
            (error) => console.error(error)
        );
    }, 1500);


}

angular.module('notaryFees', ['department'])
    .service('notaryFeesService', notaryFeesService)
    .controller('notaryFeesController', notaryFeesController);