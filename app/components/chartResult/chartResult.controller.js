
export default function chartResultController($rootScope, configService, creditService) {
    'ngInject';

    configService.get().$promise.then(
        (config) => {
            let lxAxis = config.line.xAxis;
            lxAxis.labels.formatter = function () {
                let loanDuration = creditService.getCreditModel().credit.annee;
                lxAxis.title.text =  loanDuration > 4 ? 'années' : 'mois';
                lxAxis.tickInterval = loanDuration > 4 ? 12 : 1;

                return loanDuration > 4 ? this.value / 12 : this.value;
            };

            let axAxis = config.area.xAxis;
            axAxis.labels.formatter = function () {
                let loanDuration = creditService.getCreditModel().credit.annee;
                axAxis.title.text = loanDuration > 4 ? 'années' : 'mois';
                axAxis.tickInterval = loanDuration > 4 ? 12 : 1;
                return loanDuration > 4 ? this.value / 12 : this.value;
            };

            creditService.getCreditModel().chartArea(config.area);
            creditService.getCreditModel().chartLine(config.line);
            creditService.getCreditModel().chartPie(config.pie);
        });

    let options = [
        {"id": "chart1", "config": "pie", "title": "Répartition du remboursement"},
        {"id": "chart2", "config": "line", "title": "Évolution du remboursement"},
        {"id": "chart3", "config": "area", "title": "Évolution de la dette"}
    ];

    this.$doCheck = () => this.cgPromise = $rootScope.cgPromise;

    this.option = options[0];

    this.swapChartType = (index) => {
        this.option = options[index];
    };

}
