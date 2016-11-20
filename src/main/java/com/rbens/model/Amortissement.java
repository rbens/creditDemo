package com.rbens.model;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import static com.rbens.utils.NumberFormatter.formatNumber;

@JsonAutoDetect(fieldVisibility= JsonAutoDetect.Visibility.ANY)
final class Amortissement {

    final int mois;
    final double interet;
    final double principal;
    final double assurance;
    final double mensualite;
    final double restant;

    public Amortissement(int mois, double interet, double principal, double assurance, double mensualite, double restant) {
        this.mois = mois;
        this.interet = formatNumber(interet);
        this.principal = formatNumber(principal);
        this.assurance = formatNumber(assurance);
        this.mensualite = formatNumber(mensualite);
        this.restant = formatNumber(restant);
    }

}
