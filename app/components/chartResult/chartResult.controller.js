import $ from 'jquery';

export default function chartResultController(configService, creditService, $window) {
    'ngInject';

    configService.get().$promise.then(
        (config) => {
            config.line.xAxis.labels.formatter = function () {
                return this.value / 12;
            };
            config.area.xAxis.labels.formatter = function () {
                return this.value / 12;
            };

            creditService.getDataModel().chartArea(config.area);
            creditService.getDataModel().chartLine(config.line);
            creditService.getDataModel().chartPie(config.pie);
        });
    let options = [
        {"id": "chart1", "config": "pie", "title": "Répartition du remboursement"},
        {"id": "chart2", "config": "line", "title": "Évolution du remboursement"},
        {"id": "chart3", "config": "area", "title": "Évolution de la dette"}
    ];


    angular.element($window).bind('resize', () => {
        this.panelWidth = $('.panel-body').css('width');
        this.$digest();
    });

    this.option = options[0];

    this.swapChartType = (index) => {
        this.option = options[index];
    };

}
