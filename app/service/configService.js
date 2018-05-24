'use strict';

export function configService($resource) {
    "ngInject";
    return $resource('../config/config.json');
}

