export default function notaryFeesService($http) {
    'ngInject';
    let notaryFeesModel;

    this.notaryFeesInfo = {
        cost: '',
            propertyType: '',
            localite: ''
    };

    this.notaryFeesDetailsRequest = (notaryFrees) => $http.get('notary-frees', {
        params: {
            'cost': notaryFrees.cost,
            'propertyType': notaryFrees.propertyType,
            'zip': notaryFrees.localite.code
        }
    });


    this.getNotaryFeesModel = () => notaryFeesModel;
    this.setNotaryFeesModel = (model) => notaryFeesModel = model;

    return this;
}