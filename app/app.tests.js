import format from "./filter/format.filter";
import configService from "./service/config.service";

angular.module('mainApp', ['ngResource'])
    .filter('euro', () => format.euro)
    .filter('rate', () => format.rate)
    .filter('year', () => format.year)
    .factory('configService', configService);