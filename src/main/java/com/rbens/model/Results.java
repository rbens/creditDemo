package com.rbens.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rbens.utils.NumberFormatter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.rbens.utils.NumberFormatter.formatNumberToDoubleValue;


@SuppressWarnings("unused")
public final class Results extends MonthlyPayment {

    private TotalCost insurance = (list)->list.stream().mapToDouble(a -> a.insuranceAmount).sum();
    private TotalCost interest = (list)->list.stream().mapToDouble(a -> a.interestAmount).sum();
    private TotalCost owing = (list)->list.stream().mapToDouble(a -> a.monthlyAmount).sum();

    @FunctionalInterface
    interface TotalCost{
        double calculTotal(List<WriteDown> writeDowns);
    }

    private double applyCalcul(List<WriteDown> list, TotalCost tc){
        return tc.calculTotal(list);
    }

    @JsonProperty
    private double insuranceTotalCost(){
        return insurance.calculTotal(writeDowns);
    }

    @JsonProperty
    private double interestTotalCost(){
        return interest.calculTotal(writeDowns);
    }

    @JsonProperty
    private double owingTotalCost(){
        return owing.calculTotal(writeDowns);
    } 

    @JsonProperty
    double creditTotalCost() { return interestTotalCost() + insuranceTotalCost(); }

    @JsonProperty(value = "interetSeries")
    double[] interetSeries(){
        return  calculSeries(writeDowns.stream()
                .mapToDouble(WriteDown::getInterestAmount)
                .toArray());
    }

    @JsonProperty(value = "assuranceSeries")
    double[] assuranceSeries(){
        return calculSeries(writeDowns.stream()
                .mapToDouble(WriteDown::getInsuranceAmount)
                .toArray());
    }

    @JsonProperty(value = "creditSeries")
    double[] creditSeries(){
        return calculSeries(writeDowns.stream()
                .mapToDouble(d -> Double.sum(d.interestAmount, d.insuranceAmount))
                .toArray());
    }

    @JsonProperty(value = "capitalRestantSeries")
    double[] capitalRestantSeries(){
        return writeDowns.stream()
                .mapToDouble(WriteDown::getOwingAmount)
                .map(NumberFormatter::formatNumberToDoubleValue)
                .toArray();
    }

    @JsonProperty(value = "totalRestantSeries")
    double[] totalRestantSeries() {
        return reverseArrayDouble(calculSeries(writeDowns.stream()
                .mapToDouble(WriteDown::getMonthlyAmount)
                .toArray()));
    }

    private double[] calculSeries(double[] series){
        final double[] seriesResults = new double[months];
        double cumul = 0;
        int cpt = 0;

        for(double writeDown : series){
            cumul = Double.sum(cumul, writeDown);
            seriesResults[cpt++] = formatNumberToDoubleValue(cumul) ;
        }
        return seriesResults;
    }

    private double[] reverseArrayDouble(double[] doubles){
        final List<Double> list = Arrays.stream(doubles).boxed().collect(Collectors.toList());
        Collections.reverse(list);
        return list.stream()
                .mapToDouble(Double::doubleValue)
                .map(NumberFormatter::formatNumberToDoubleValue)
                .toArray();
    }

}
