

export default class DataModel{

    constructor(model, line, area, pie){
            this.model = model;
            this.line = line;
            this.area = area;
            this.pie = pie;
    }

    static isDefined(value){
       return value && value !== null && value !== 0;
    }

    dataModel( model ){
        Object.assign(this.model, model);
    }

    chartLine( line ){
        Object.assign(this.line, line);
    }

    chartArea( area ){
        Object.assign(this.are, area);
    }

    chartPie( pie ){
        Object.assign(this.pie, pie);
    }

    isComplete(){
        return DataModel.isDefined(this.model.annee) && DataModel.isDefined(this.model.capital) && DataModel.isDefined(this.model.tauxNominal);
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

        this.line.xAxis.tickInterval = creditSeries.length < 60 ? 1 : 12;
        this.area.xAxis.tickInterval = creditSeries.length < 60 ? 1 : 12;
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
    };

}