import creditFormController from "./creditForm.controller";

export default function creditForm() {
    return {
        restrict:'E',
        template: require('./creditForm.html'),
        controller: creditFormController
    };
}

