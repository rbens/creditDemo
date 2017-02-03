package com.rbens.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public final class Results extends MonthlyPayment {

    @JsonProperty
    double insuranceTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.insuranceAmount).sum();
    }

    @JsonProperty
    double interestTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.interestAmount).sum();
    }

    @JsonProperty
    double owingTotalCost() {
        return writeDowns.stream().mapToDouble(a -> a.monthlyAmount).sum();
    }

    @JsonProperty
    double creditTotalCost() { return interestTotalCost() + insuranceTotalCost(); }
}
