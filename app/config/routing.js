

export default function routing($locationProvider, $stateProvider) {
    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');

    $stateProvider.state({
        name:'root',
        url:'/',
        controller:'contentViewCtrl',
        template : require('../views/contentView.html')
    });

}