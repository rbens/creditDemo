import chartResultController from "./chartResult.controller";

export const chartResultComponent = {
    bindings: {
        model: '<'
    },
    template: require('./chartResult.html'),
    controller: chartResultController
};

