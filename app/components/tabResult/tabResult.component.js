import tabResultController from './tabResult.controller';

export default function tabResult() {
    'ngInject';
    return {
        restrict : 'E',
        template : require('./tabResult.html'),
        controller:  tabResultController
    };
}
