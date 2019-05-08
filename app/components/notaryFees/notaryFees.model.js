
export default class NotaryFeesModel{

    constructor(notaryTaxes, taxes, disbursements) {
        this.notaryTaxes = notaryTaxes;
        this.taxes = taxes;
        this.disbursements = disbursements;
        this.total = notaryTaxes + taxes + disbursements;
    }
}