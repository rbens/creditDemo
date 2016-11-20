package com.rbens.model;

import static com.rbens.utils.ArrayNumber.reverseArray;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public final class Series extends Mensualite{

    public double[] getInteretSeries() {
        final double[] interetSeries = new double[mois];
        double cumul = 0;
        int  cpt = 0;

        for(Amortissement amortissement : amortissements){
            cumul+=amortissement.interet;
            interetSeries[cpt++] = cumul;
        }

        return interetSeries;
    }

    public double[] getAssuranceSeries() {
        final double[] assuranceSeries = new double[mois];
        double cumul = 0;
        int  cpt = 0;

        for(Amortissement amortissement : amortissements){
            cumul+=amortissement.assurance;
            assuranceSeries[cpt++] = cumul;
        }
        return assuranceSeries;
    }

    public double[] getCreditSeries() {
        final double[] creditSeries = new double[mois];
        double cumul = 0;
        int  cpt = 0;

        for(Amortissement amortissement : amortissements){
            cumul += amortissement.assurance + amortissement.interet;
            creditSeries[cpt++] = cumul ;
        }
        return creditSeries;
    }

    public double[] getCapitalRestantSeries() {
        final double[] capitalRestantSeries = new double[mois];
        int  cpt = 0;

        for(Amortissement amortissement : amortissements){
            capitalRestantSeries[cpt++] = amortissement.restant ;
        }
        return capitalRestantSeries;
    }

    public Double[] getTotalRestantSeries() {
        final Double[] totalRestantSeries = new Double[mois];
        double cumul = 0;
        int  cpt = 0;


        for(Amortissement amortissement : amortissements){
            cumul+=amortissement.mensualite;
            totalRestantSeries[cpt++] = cumul;
        }

        return reverseArray(totalRestantSeries);
    }

}
