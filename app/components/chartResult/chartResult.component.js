import chartResultController from "./chartResult.controller";

export default function chartResultComponent() {
    return {
        template: require('./chartResult.html'),
        controller: chartResultController
    }
}

