

export default class DataModel{

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

    dataModel( model ){
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
        this.credit.tauxNominal = Number(DataModel.formatNumber(this.credit.tauxNominal));

        if (this.credit.tauxAssurance) {
            this.credit.tauxAssurance = Number(DataModel.formatNumber(this.credit.tauxAssurance));
            this.credit.tauxGlobal = this.credit.tauxNominal + this.credit.tauxAssurance;
        } else {
            this.credit.tauxGlobal = this.credit.tauxNominal;
        }
    }

    isComplete(){
        return DataModel.isDefined(this.credit.annee) && DataModel.isDefined(this.credit.capital) && DataModel.isDefined(this.credit.tauxNominal);
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

    addSeriesToPieChart(interetSeries, assuranceSeries, creditSeries){
        this.pie.series = [];
        this.pie.series.push({
            type: 'pie',
            name: 'somme en euros',
            data: [
                ['Cout total interets ', interetSeries],
                ['Cout total assurances', assuranceSeries],
                ['Capital emprunté', creditSeries]
            ]

        });
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