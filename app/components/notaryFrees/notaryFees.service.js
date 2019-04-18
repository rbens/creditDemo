import NotaryFeesModel from "./notaryFees.model";

export default function notaryFeesService($http) {
    'ngInject';
    let notaryFeesModel;

    return {
        notaryFeesInfo : {
            cost: '',
            propertyType: '',
            localite: {
                city : '',
                code : ''
            }
        },
        notaryFeesDetailsRequest : (notaryFrees) => $http.get('notary-frees', {
            params: {
                'cost': notaryFrees.cost,
                'propertyType': notaryFrees.propertyType,
                'zip': notaryFrees.localite.code
            }
        }),
        getNotaryFeesModel: () => notaryFeesModel,
        setNotaryFeesModel: (notaryTaxes, taxes, disbursments) => notaryFeesModel = new NotaryFeesModel(notaryTaxes, taxes, disbursments)

    };
}