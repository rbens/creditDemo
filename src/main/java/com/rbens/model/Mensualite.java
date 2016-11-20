package com.rbens.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public abstract class Mensualite {

    @JsonProperty
    int mois;

    @JsonProperty
    double capital;

    @JsonProperty
    float tauxNominal;

    @JsonProperty
    float tauxAssurance;

    List<Amortissement> amortissements;

    public Mensualite() {
    }

    @JsonProperty(value = "coutPrincipal")
    double calculCredit(){
        final float v = (tauxNominal * 0.01f) / 12;
        return (capital * v) / (1 - Math.pow((1+ v),-mois));
    }

    @JsonProperty(value = "coutAssurance")
    double calculAssurance() {
        final float v = (tauxAssurance * 0.01f) / 12;
        return capital * v;
    }

    @JsonProperty
    double mensualite(){
        return calculCredit()+calculAssurance();
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
            principal =  calculCredit() - interet;
            mensualite = calculCredit() + assurance;
            capitalRestant = capitalRestant - principal;

            //dernier mois
            if(i == mois){
                mensualite = mensualite + capitalRestant;
                capitalRestant = 0;
            }

            amortissements.add(new Amortissement(i, interet, principal, assurance, mensualite, capitalRestant));
        }

        return amortissements;
    }

}
