

export default class CreditModel{

    constructor(model, line, area, pie){
            this.credit = model;
            this.line = line;
            this.area = area;
            this.pie = pie;
    }

    static isDefined(value){
       return value && value !== 0;
    }

    static formatNumber(data) {
        return data.toFixed(2);
    }

    creditModel(model ){
        Object.assign(this.credit, model);
    }

    chartLine( line ){
        Object.assign(this.line, line);
    }

    chartArea( area ){
        Object.assign(this.area, area);
    }

    chartPie( pie ){
        Object.assign(this.pie, pie);
    }

    teg(){
        this.credit.tauxNominal = Number(CreditModel.formatNumber(this.credit.tauxNominal));

        if (this.credit.tauxAssurance) {
            this.credit.tauxAssurance = Number(CreditModel.formatNumber(this.credit.tauxAssurance));
            this.credit.tauxGlobal = this.credit.tauxNominal + this.credit.tauxAssurance;
        } else {
            this.credit.tauxGlobal = this.credit.tauxNominal;
        }
    }

    isComplete(){
        return CreditModel.isDefined(this.credit.annee) && CreditModel.isDefined(this.credit.capital) && CreditModel.isDefined(this.credit.tauxNominal);
    }

    addSeries(interetSeries, assuranceSeries, creditSeries, capitalRestantSeries, interetRestantSeries){
        this.line.series = [];
        this.line.series.push({
            "name": 'Intérets',
            "data": interetSeries
        }, {
            "name": 'Assurance',
            "data": assuranceSeries
        }, {
            "name": 'Crédit',
            "data": creditSeries
        });

        this.area.series = [];
        this.area.series.push({
            "name": 'Capital restant',
            "data": capitalRestantSeries
        }, {
            "name": 'Total restant',
            "data": interetRestantSeries
        });

    }

    addSeriesToPieChart(interetSeries, assuranceSeries, creditSeries, notaryFrees){
        this.pie.series = [];
        this.pie.series.push({
            type: 'pie',
            name: 'somme en euros',
            data: [
                ['Capital emprunté', creditSeries],
                ['Cout total interets ', interetSeries]
            ]

        });
        if(assuranceSeries) this.pie.series[0].data.push(['Cout total assurances', assuranceSeries]);
        if(notaryFrees) this.pie.series[0].data.push(['Frais de notaire', notaryFrees]);
    }

    reset($filter){
        this.credit = {
            capital: '',
            annee: '',
            tauxNominal: '',
            tauxAssurance: '',
            tauxGlobal: $filter('rate')(0),
            amortissements: [],
            mensualite: $filter('euro')(0),
            interetTotal: $filter('euro')(0),
            assuranceTotal: $filter('euro')(0),
            creditTotal: $filter('euro')(0),
            assurance: $filter('euro')(0),
            remboursementTotal: $filter('euro')(0)
        };
    }

}