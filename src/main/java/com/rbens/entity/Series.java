package com.rbens.entity;

import com.rbens.utils.Format;

import static com.rbens.utils.Format.formatNumber;

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
            cumul+=amortissement.getInteret();
            interetSeries[cpt++] = formatNumber(cumul);
        }

        return interetSeries;
    }

    public double[] getAssuranceSeries() {
        final double[] assuranceSeries = new double[mois];
        double cumul = 0;
        int  cpt = 0;

        for(Amortissement amortissement : amortissements){
            cumul+=amortissement.getAssurance();
            assuranceSeries[cpt++] = formatNumber(cumul) ;
        }
        return assuranceSeries;
    }

    public double[] getCreditSeries() {
        final double[] creditSeries = new double[mois];
        double cumul = 0;
        int  cpt = 0;

        for(Amortissement amortissement : amortissements){
            cumul += amortissement.getAssurance() + amortissement.getInteret();
            creditSeries[cpt++] = formatNumber(cumul) ;
        }
        return creditSeries;
    }

    public double[] getCapitalRestantSeries() {
        final double[] capitalRestantSeries = new double[mois];
        int  cpt = 0;

        for(Amortissement amortissement : amortissements){
            capitalRestantSeries[cpt++] = amortissement.getRestant() ;
        }
        return capitalRestantSeries;
    }

    public Double[] getTotalRestantSeries() {
        final Double[] totalRestantSeries = new Double[mois];
        double cumul = 0;
        int  cpt = 0;


        for(Amortissement amortissement : amortissements){
            cumul+=amortissement.getMensualite();
            totalRestantSeries[cpt++] = formatNumber(cumul) ;
        }

        return  new Format<Double>().reverseArray(totalRestantSeries);
    }

}
