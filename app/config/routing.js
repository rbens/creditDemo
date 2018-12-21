export default function routing($locationProvider, $stateProvider) {
    'ngInject';
    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');

    $stateProvider.state({
        name:'root',
        url:'/',
        controller:'mainCtrl',
        controllerAs:'content',
        template : require('../components/main/main.html')
    });

}