package com.rbens.model;

import com.rbens.utils.NumberFormatter;

import static com.rbens.utils.ArrayNumber.reverseArray;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public final class Series extends MonthlyPayment {

    public double[] getInteretSeries() {
        final double[] interetSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.interestAmount);
            interetSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul);
        }

        return interetSeries;
    }

    public double[] getAssuranceSeries() {
        final double[] assuranceSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.insuranceAmount);
            assuranceSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul);
        }
        return assuranceSeries;
    }

    public double[] getCreditSeries() {
        final double[] creditSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.insuranceAmount + writeDown.interestAmount);
            creditSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul) ;
        }
        return creditSeries;
    }

    public double[] getCapitalRestantSeries() {
        final double[] capitalRestantSeries = new double[months];
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            capitalRestantSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(writeDown.owingAmount);
        }
        return capitalRestantSeries;
    }

    public Double[] getTotalRestantSeries() {
        final Double[] totalRestantSeries = new Double[months];
        double cumul = 0;
        int  cpt = 0;


        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.monthlyAmount);
            totalRestantSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul);
        }

        return reverseArray(totalRestantSeries);
    }

}
