

export default function marketRateController($scope, creditService, $mdDialog, $interval, $mdColors, apiService) {
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


    apiService.getMarketRates().then(
        (response) => {
            if (response) {
                let id = 1;
                angular.forEach(response.data, (val, key) => this.rates.push({
                        id: id++,
                        rate: val,
                        years: key === 0 ? 7 : 10 + ((key - 1) * 5)
                    })
                );
            }
        });

    this.updateRate = (result) => {
        this.model.tauxNominal = Number(result.rate.replace('%', '').replace(',', '.'));
        this.model.tauxGlobal = this.model.tauxNominal + this.model.tauxAssurance;
        this.model.annee = result.years;
        creditService.setCreditModel(this.model);
        creditService.calcul();
        creditService.teg();
        $interval.cancel(intervalPromise);
        this.isCancel = true;
    };

    this.modalRate = (ev) => {
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
