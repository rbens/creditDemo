export default function notaryFreesService($http) {
    'ngInject';
    return {
        notaryFreesInfo : {
            cost: '',
            propertyType: '',
            localite: '',
            price: 0
        },
        notaryFreesCompute : (notaryFrees) => $http.get('notary-frees', {
            params: {
                'cost': notaryFrees.cost,
                'propertyType': notaryFrees.propertyType,
                'zip': notaryFrees.localite.code
            }
        })

    };
}