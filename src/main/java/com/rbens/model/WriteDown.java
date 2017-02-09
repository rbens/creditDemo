package com.rbens.model;


import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility= JsonAutoDetect.Visibility.ANY)
final class WriteDown {

    final int currentMonth;
    final double interestAmount;
    final double principalAmount;
    final double insuranceAmount;
    final double monthlyAmount;
    final double owingAmount;

    public WriteDown(int currentMonth, double interestAmount, double principalAmount, double insuranceAmount, double monthlyAmount, double owingAmount) {
        this.currentMonth    = currentMonth;
        this.interestAmount  = interestAmount;
        this.principalAmount = principalAmount;
        this.insuranceAmount = insuranceAmount;
        this.monthlyAmount   = monthlyAmount;
        this.owingAmount     = owingAmount;
    }

}
