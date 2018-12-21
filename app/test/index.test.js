import 'angular';
import 'angular-mocks';


var testsFilter = require.context("../filter", true, /-spec$/);
testsFilter.keys().forEach(testsFilter);

var testsService = require.context("../service", true, /-spec$/);
testsService.keys().forEach(testsService);