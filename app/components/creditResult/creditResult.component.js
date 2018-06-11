import creditResultController from './creditResult.controller';

export const creditResult = {
    bindings: {
        model: '<',
        promiseForm: '<'
    },
    template: require('./creditResult.html'),
    controller: creditResultController
};
