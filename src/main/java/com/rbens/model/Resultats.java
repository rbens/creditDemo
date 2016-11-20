package com.rbens.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public final class Resultats extends Mensualite{

    @JsonProperty
    private double assuranceTotal() {
        return amortissements.stream().mapToDouble(a -> a.assurance).sum();
    }

    @JsonProperty
    private double interetTotal() {
        return amortissements.stream().mapToDouble(a -> a.interet).sum();
    }

    @JsonProperty
    private double remboursementTotal() {
        return amortissements.stream().mapToDouble(a -> a.mensualite).sum();
    }

    @JsonProperty
    private double getCreditTotal() { return interetTotal() + remboursementTotal(); }
}
