import chartResultController from "./chartResult.controller";

export const chartResultComponent = {
    bindings: {
        model: '<',
        promiseForm: '<'
    },
    template: require('./chartResult.html'),
    controller: chartResultController
};

