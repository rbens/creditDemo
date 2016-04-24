package com.rbens.entity;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public final class Resultats extends Mensualite{

    private double assuranceTotal = 0;
    private double interetTotal = 0;
    private double remboursementTotal = 0;

    public double getAssuranceTotal() {
        for(Amortissement amortissement : amortissements){
            assuranceTotal += amortissement.getAssurance();
        }

        return  assuranceTotal;
    }

    public double getInteretTotal() {
        for(Amortissement amortissement : amortissements){
            interetTotal += amortissement.getInteret();
        }

        return interetTotal;
    }


    public double getRemboursementTotal() {
        for(Amortissement amortissement : amortissements){
            remboursementTotal += amortissement.getMensualite();
        }

        return remboursementTotal;
    }

    public double getCreditTotal() { return interetTotal + assuranceTotal; }
}
