'use strict';

export default function cityService($resource) {
    "ngInject";
    return $resource('../cities/cities.json');
}

