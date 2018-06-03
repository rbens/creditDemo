import marketRateController from './marketRate.controller';

export default function marketRate() {
    return {
        restrict : 'E',
        template : require('./marketRate.html'),
        controller:   marketRateController  };
}

