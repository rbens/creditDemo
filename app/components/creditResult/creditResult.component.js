import creditResultController from './creditResult.controller';

export const creditResult = {
    bindings: {
        model: '<'
    },
    template: require('./creditResult.html'),
    controller: creditResultController
};
