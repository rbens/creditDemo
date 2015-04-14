package com.rbens.entity;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

import static com.rbens.utils.Format.formatNumber;
import static java.lang.Double.valueOf;

public abstract class Mensualite {

    int mois;
    double capital;
    float tauxNominal;
    float tauxAssurance;
    List<Amortissement> amortissements;

    public Mensualite() {
    }

    public int getMois() {
        return mois;
    }

    public double getCapital() {
        return capital;
    }

    public float getTauxNominal() {
        return tauxNominal;
    }

    public float getTauxAssurance() {
        return tauxAssurance;
    }

    public double getCoutPrincipal() {
        return formatNumber(calculCredit());
    }

    public double getCoutAssurance(){
        return formatNumber(calculAssurance());
    }

    public double getMensualite(){
        return formatNumber(getCoutPrincipal()+getCoutAssurance());
    }

    public List<Amortissement> getAmortissements(){
        amortissements = new ArrayList<Amortissement>();
        final float v = (tauxNominal * 0.01f) / 12;
        final Double assurance = calculAssurance();
        double capitalRestant = capital;
        double interet;
        double principal;
        double mensualite;
        for (int i=1 ; i<= mois; i++){
            interet = capitalRestant * v ;
            principal =  getCoutPrincipal() - interet;
            mensualite = formatNumber(calculCredit() + assurance);
            capitalRestant = capitalRestant - principal;

            //dernier mois
            if(i == mois){
                mensualite = mensualite + capitalRestant;
                capitalRestant = 0;
            }

            amortissements.add(new Amortissement(i, formatNumber(interet), formatNumber(principal), formatNumber(assurance), mensualite, formatNumber(capitalRestant)));
        }

        return amortissements;
    }

    private double calculCredit(){
        final float v = (tauxNominal * 0.01f) / 12;
        return formatNumber((capital * v) / (1 - Math.pow((1+ v),-mois)));
    }


    private double calculAssurance() {
        final float v = (tauxAssurance * 0.01f) / 12;
        return formatNumber(capital * v);
    }



}
