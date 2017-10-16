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
    float insuranceRate;

    List<WriteDown> writeDowns;

    public MonthlyPayment() {
        writeDowns = new ArrayList<>();
    }

    @JsonProperty(value = "coutPrincipal")
    double creditFormula(){
        final float v = (interestRate * 0.01f) / 12;
        return (capital * v) / (1 - Math.pow((1+ v),-months));
    }

    @JsonProperty(value = "coutAssurance")
    double insuranceFormula() {
        final float v = (insuranceRate * 0.01f) / 12;
        return capital * v;
    }

    @JsonProperty
    double monthlyAmount(){
        return creditFormula()+ insuranceFormula();
    }

    public List<WriteDown> getWriteDowns(){
        final float v = (interestRate * 0.01f) / 12;
        final double assurance = insuranceFormula();
        double capitalRestant = capital;
        double interet;
        double principal;
        double mensualite;
        for (int currentMonth=1 ; currentMonth<= months; currentMonth++){
            interet = capitalRestant * v ;
            principal =  creditFormula() - interet;
            mensualite = creditFormula() + assurance;
            capitalRestant = capitalRestant - principal;

            //handle the last months
            if(currentMonth == months){
                mensualite = mensualite + capitalRestant;
                capitalRestant = 0;
            }

            writeDowns.add(new WriteDown(currentMonth, interet, principal, assurance, mensualite, capitalRestant));
        }

        return writeDowns;
    }

}
