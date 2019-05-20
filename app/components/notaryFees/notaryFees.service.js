export default function notaryFeesService() {
    'ngInject';
    let notaryFeesModel;

    this.notaryFeesInfo = {
            cost: '',
            propertyType: '',
            localite: ''
    };

    this.getNotaryFeesModel = () => notaryFeesModel;
    this.setNotaryFeesModel = (model) => notaryFeesModel = model;

    return this;
}