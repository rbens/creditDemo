import * as angular from "angular";

declare var require: (filename: string) => any;


interface Rate {
    id : number;
    rate : number;
    year : number;
}

export default function marketRateController($scope :any,
                                             creditService :any,
                                             $mdDialog :any,
                                             $interval :any,
                                             $mdColors :any,
                                             apiService :any) {
    'ngInject';

    let intervalPromise = $interval(() => {
            this.currentId++;
            this.currentId = this.rates.length < this.currentId ? 0 : this.currentId;
        }, 1000),
        colorsTab = ['Pink-A400', 'Purple-A400', 'DeepPurple-A400', 'Indigo-A400', 'Blue-A400', 'LightBlue-A400'];

    this.colorAccent = $mdColors.getThemeColor(colorsTab[5]);
    this.rates = [];
    this.currentId = 0;
    this.isCancel = false;
    this.model = {};


    let initRates = (response: any) => {
            let id = 0;
            const yearsRange = [7,10,15,20,25,30];

            for (let data of response.data){
                let rate: Rate = {id: id, rate:data, year:yearsRange[id]};
                this.rates.push(rate);
                id++;
            }
    };

    apiService.getMarketRates().then((response : any) => initRates(response));

    this.updateRate = (result : any) => {
        this.model.tauxNominal = Number(result.rate.replace('%', '').replace(',', '.'));
        this.model.tauxGlobal = this.model.tauxNominal + this.model.tauxAssurance;
        this.model.annee = result.year;
        creditService.setCreditModel(this.model);
        creditService.calcul();
        creditService.teg();
        $interval.cancel(intervalPromise);
        this.isCancel = true;
    };

    this.modalRate = (ev : any) => {
        $mdDialog.show({
            parent: angular.element(document.body),
            template: require('./marketRate.modal.html'),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(
            () => this.status = 'cancel',
            () => this.status = 'close'
        );
    };
}
