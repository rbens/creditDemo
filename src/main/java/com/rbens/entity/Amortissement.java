package com.rbens.entity;

/**
 */
final class Amortissement {

    private final int mois;
    private final double interet;
    private final double principal;
    private final double assurance;
    private final double mensualite;
    private final double restant;



    public Amortissement(int mois, double interet, double principal, double assurance, double mensualite, double restant) {
        this.mois = mois;
        this.interet = interet;
        this.principal = principal;
        this.assurance = assurance;
        this.mensualite = mensualite;
        this.restant = restant;
    }

    public double getInteret() { return interet; }

    public double getPrincipal() { return principal; }

    public double getAssurance() { return assurance; }

    public double getMensualite() { return mensualite; }

    public double getRestant() { return restant; }

    public int getMois() { return mois; }

}
