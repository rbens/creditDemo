

export default class {


    constructor(model){
            this.model = model;
    }

    get dataModel(){
        return this.model;
    }

    set dataModel( model ){
        Object.assign(this.model, model);
    }

    formatNumber = (data) => $filter('number')(data, 2)
}