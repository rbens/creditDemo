import creditResultController from './creditResult.controller';

export default function creditResult(){
    return {
        restrict: 'E',
        template: require('./creditResult.html'),
        controller: creditResultController
    };
}
