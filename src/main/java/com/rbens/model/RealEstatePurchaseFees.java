package com.rbens.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.Arrays;

import static com.rbens.utils.NumberFormatter.formatNumberToDoubleValue;

public class RealEstatePurchaseFees {

    private final double OUT_OF_POCKET_EXPENSE_ESTIMATED = 500;
    private final double FORMALITIES_EXPENSE_ESTIMATED = 800;
    private final double REAL_ESTATE_SECURITY_TAX = 0.001;
    private final double NOTARY_FEES_TAX = 0.2;
    private final double buyingPrice;
    private final String zipCode;

    private RealEstatePurchaseFees(double buyingPrice, String zipCode) {
        this.buyingPrice = buyingPrice;
        this.zipCode = zipCode;
    }

    public static RealEstatePurchaseFees buildFrom(double buyingPrice, String zipCode){
        return new RealEstatePurchaseFees(buyingPrice,zipCode);
    }

    private double notaryFeesCost(){
        return NotaryFees.costCalculatedFrom(buyingPrice) + FORMALITIES_EXPENSE_ESTIMATED;
    }

    private double registerTax(){
        return RegisterTax.getRateAccordingZip(zipCode) * buyingPrice;
    }

    private double realEstateSecurityTax(){
        return REAL_ESTATE_SECURITY_TAX * buyingPrice;
    }

    private double notaryFeesTax(){
        return notaryFeesCost() * NOTARY_FEES_TAX;
    }

    public Details getDetails(){
        return new Details();
    }

    @JsonAutoDetect(fieldVisibility= JsonAutoDetect.Visibility.ANY)
    public class Details {
        final double outOfPocketExpense;
        final double totalTax;
        final double notaryFees;

        Details() {
            outOfPocketExpense = OUT_OF_POCKET_EXPENSE_ESTIMATED;
            notaryFees = notaryFeesCost();
            totalTax = registerTax() + realEstateSecurityTax() + notaryFeesTax();
        }
    }

    private enum NotaryFees {
        FIRST_STEP_APPLICATION(0.03945, 0,6500),
        SECOND_STEP_APPLICATION(0.01627, 6500,17000),
        THIRD_STEP_APPLICATION(0.01085, 17000,60000),
        LAST_STEP_APPLICATION(0.00814, 60000,Double.MAX_VALUE);


        private final double rate;
        private final double amountMin;
        private final double amountMax;



        NotaryFees(double rate, double amountMin, double amountMax) {
            this.rate = rate;
            this.amountMin = amountMin;
            this.amountMax = amountMax;
        }

        static double costCalculatedFrom(double buyingPrice){
            return formatNumberToDoubleValue(
                    Arrays.stream(NotaryFees.values())
                            .filter(currentStepApplication -> buyingPrice > currentStepApplication.amountMin)
                            .mapToDouble(currentStepApplication -> notaryCostApplication(buyingPrice, currentStepApplication))
                            .sum());
        }

        private static double notaryCostApplication(double buyingPrice, NotaryFees step) {
            final double intermediateNotaryStepRule = step.rate * (step.amountMax - step.amountMin);
            final double lastNotaryStepRule = step.rate * (buyingPrice - step.amountMin);

            return step.amountMax < buyingPrice ? intermediateNotaryStepRule : lastNotaryStepRule;
        }
    }

    private static class RegisterTax {

        static final double SPECIFIC_ZIP_RATE = 0.0511;
        static final double REGULAR_RATE = 0.0581;

        static double getRateAccordingZip(String zipCode){
            return Arrays.stream(SpecialDepartment.values())
                    .filter(department -> zipCode.substring(0, 2).equalsIgnoreCase(department.code))
                    .findFirst()
                    .map(rate -> SPECIFIC_ZIP_RATE).orElse(REGULAR_RATE);
        }
    }


    private enum SpecialDepartment {
        INDRE_CODE("36"),
        ISERE_CODE("38"),
        MORBIHAN_CODE("56"),
        MAYOTTE_CODE("976");


        private String code;

        SpecialDepartment(String code) {
            this.code = code;
        }
    }

}
