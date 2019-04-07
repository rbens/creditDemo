package com.rbens.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public abstract class MonthlyPayment {

    @JsonProperty
    int months;

    @JsonProperty
    double capital;

    @JsonProperty
    float interestRate;

    @JsonProperty
    private float insuranceRate;

    List<WriteDown> writeDowns;

    MonthlyPayment() {
        this.writeDowns = new ArrayList<>();
    }

    @JsonProperty(value = "coutPrincipal")
    private double creditFormula(){
        final float v = (this.interestRate * 0.01f) / 12;
        return (this.capital * v) / (1 - Math.pow((1+ v),-this.months));
    }

    @JsonProperty(value = "coutAssurance")
    private double insuranceFormula() {
        final float v = (this.insuranceRate * 0.01f) / 12;
        return this.capital * v;
    }

    @JsonProperty
    double monthlyAmount(){
        return creditFormula()+ insuranceFormula();
    }

    public List<WriteDown> getWriteDowns(){
        buildWriteDowns((this.interestRate * 0.01f) / 12, insuranceFormula(), this.capital);
        return this.writeDowns;
    }

    private void buildWriteDowns(float monthlyInterestRate, double assurance, double capitalRestant) {
        double interet;
        double principal;
        double mensualite;

        for (int currentMonth = 1; currentMonth<= months; currentMonth++){
            interet = capitalRestant * monthlyInterestRate ;
            principal =  creditFormula() - interet;
            mensualite = creditFormula() + assurance;
            capitalRestant = capitalRestant - principal;

            //handle the last months
            if(currentMonth == months){
                mensualite = mensualite + capitalRestant;
                capitalRestant = 0;
            }

            writeDowns.add(WriteDown.builder()
                    .currentMonth(currentMonth)
                    .interestAmount(interet)
                    .principalAmount(principal)
                    .insuranceAmount(assurance)
                    .monthlyAmount(mensualite)
                    .owingAmount(capitalRestant)
                    .build());
        }
    }

}
