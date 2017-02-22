package com.rbens.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rbens.utils.NumberFormatter;

import static com.rbens.utils.ArrayNumber.reverseArray;

public final class Results extends MonthlyPayment {

    @JsonProperty
    double insuranceTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.insuranceAmount).sum();
    }

    @JsonProperty
    double interestTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.interestAmount).sum();
    }

    @SuppressWarnings("unused")
    @JsonProperty
    double owingTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.monthlyAmount).sum();
    }

    @SuppressWarnings("unused")
    @JsonProperty
    double creditTotalCost() { return interestTotalCost() + insuranceTotalCost(); }

    @SuppressWarnings("unused")
    @JsonProperty(value = "interetSeries")
    double[] interetSeries() {
        final double[] interetSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.interestAmount);
            interetSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul);
        }

        return interetSeries;
    }

    @SuppressWarnings("unused")
    @JsonProperty(value = "assuranceSeries")
    double[] assuranceSeries() {
        final double[] assuranceSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.insuranceAmount);
            assuranceSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul);
        }
        return assuranceSeries;
    }

    @SuppressWarnings("unused")
    @JsonProperty(value = "creditSeries")
    double[] creditSeries() {
        final double[] creditSeries = new double[months];
        double cumul = 0;
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            cumul = Double.sum(cumul, writeDown.insuranceAmount + writeDown.interestAmount);
            creditSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(cumul) ;
        }
        return creditSeries;
    }

    @SuppressWarnings("unused")
    @JsonProperty(value = "capitalRestantSeries")
    double[] capitalRestantSeries() {
        final double[] capitalRestantSeries = new double[months];
        int  cpt = 0;

        for(WriteDown writeDown : writeDowns){
            capitalRestantSeries[cpt++] = NumberFormatter.formatNumberToDoubleValue(writeDown.owingAmount);
        }
        return capitalRestantSeries;
    }

    @SuppressWarnings("unused")
    @JsonProperty(value = "totalRestantSeries")
    Double[] totalRestantSeries() {
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
