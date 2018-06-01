import chartResultController from "./chartResult.controller";

export default function chartResultComponent() {
    'ngInject';
    return {
        template: require('./chartResult.html'),
        controller: chartResultController
    }
}

