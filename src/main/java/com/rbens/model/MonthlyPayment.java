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
    }

    @JsonProperty(value = "coutPrincipal")
    double calculCredit(){
        final float v = (interestRate * 0.01f) / 12;
        return (capital * v) / (1 - Math.pow((1+ v),-months));
    }

    @JsonProperty(value = "coutAssurance")
    double calculAssurance() {
        final float v = (insuranceRate * 0.01f) / 12;
        return capital * v;
    }

    @JsonProperty
    double monthlyAmount(){
        return calculCredit()+calculAssurance();
    }

    public List<WriteDown> getWriteDowns(){
        writeDowns = new ArrayList<>();
        final float v = (interestRate * 0.01f) / 12;
        final double assurance = calculAssurance();
        double capitalRestant = capital;
        double interet;
        double principal;
        double mensualite;
        for (int currentMonth=1 ; currentMonth<= months; currentMonth++){
            interet = capitalRestant * v ;
            principal =  calculCredit() - interet;
            mensualite = calculCredit() + assurance;
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
