

export default class Routing{


    constructor($stateProvider, $locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        this.$stateProvider = $stateProvider;

    }


    state( name, url, controller, template){
        this.$stateProvider.state({
            name: name,
            url: url,
            controller: controller,
            template : require(template)
        });
    }

}