import 'angular';
import 'angular-mocks';


let testsFilter = require.context("../filter", true, /.spec$/);
testsFilter.keys().forEach(testsFilter);

let testsService = require.context("../service", true, /.spec$/);
testsService.keys().forEach(testsService);

let testsComponent = require.context("../components", true, /.spec$/);
testsComponent.keys().forEach(testsComponent);