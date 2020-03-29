import marketRateController from './marketRate.controller';
declare var require: (filename: string) => any;


export const marketRateComponent = {
        template : require('./marketRate.html'),
        controller:   marketRateController ,
        controllerAs : 'market'
};
