import creditFormController from "./creditForm.controller";

export default function creditForm() {
    'ngInject';
    return {
        restrict:'E',
        template: require('./creditForm.html'),
        controller: creditFormController
    };
}

