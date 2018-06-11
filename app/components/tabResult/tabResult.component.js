import tabResultController from './tabResult.controller';

export const tabResult = {
    bindings: {
        model: '<',
        promiseForm: '<'
    },
    template: require('./tabResult.html'),
    controller: tabResultController
};
