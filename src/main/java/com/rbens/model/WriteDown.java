package com.rbens.model;


import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility= JsonAutoDetect.Visibility.ANY)
final class WriteDown implements Comparable {

    private final int currentMonth;
    final double interestAmount;
    private final double principalAmount;
    final double insuranceAmount;
    final double monthlyAmount;
    final double owingAmount;

    WriteDown(int currentMonth, double interestAmount, double principalAmount, double insuranceAmount, double monthlyAmount, double owingAmount) {
        this.currentMonth    = currentMonth;
        this.interestAmount  = interestAmount;
        this.principalAmount = principalAmount;
        this.insuranceAmount = insuranceAmount;
        this.monthlyAmount   = monthlyAmount;
        this.owingAmount     = owingAmount;
    }

    public double getMonthlyAmount() {
        return monthlyAmount;
    }

    public double getInterestAmount() {
        return interestAmount;
    }

    public double getInsuranceAmount() {
        return insuranceAmount;
    }

    public double getOwingAmount() {
        return owingAmount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WriteDown writeDown = (WriteDown) o;

        return currentMonth == writeDown.currentMonth
                && Double.compare(writeDown.interestAmount, interestAmount) == 0
                && Double.compare(writeDown.principalAmount, principalAmount) == 0
                && Double.compare(writeDown.insuranceAmount, insuranceAmount) == 0
                && Double.compare(writeDown.monthlyAmount, monthlyAmount) == 0
                && Double.compare(writeDown.owingAmount, owingAmount) == 0;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = currentMonth;
        temp = Double.doubleToLongBits(interestAmount);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(principalAmount);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(insuranceAmount);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(monthlyAmount);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(owingAmount);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public int compareTo(Object o) {
        WriteDown writeDown = (WriteDown) o;
        return Double.compare(writeDown.monthlyAmount, monthlyAmount) ;
    }


}
