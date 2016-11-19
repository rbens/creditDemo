package com.rbens.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public final class Resultats extends Mensualite{

    @JsonProperty
    private double assuranceTotal() {
        return amortissements.stream().mapToDouble(Amortissement::getAssurance).sum();
    }

    @JsonProperty
    private double interetTotal() {
        return amortissements.stream().mapToDouble(Amortissement::getInteret).sum();
    }

    @JsonProperty
    private double remboursementTotal() {
        return amortissements.stream().mapToDouble(Amortissement::getMensualite).sum();
    }

    @JsonProperty
    private double getCreditTotal() { return interetTotal() + remboursementTotal(); }
}
