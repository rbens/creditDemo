package com.rbens.model;

import org.junit.Assert;
import org.junit.Test;

public class RealEstatePurchaseFeesTest {


    @Test
    public void should_return_notary_cost_part(){
        final RealEstatePurchaseFees realEstatePurchaseFees = RealEstatePurchaseFees.buildFrom(500000, "ancien", "95240");
        Assert.assertEquals(0, Double.compare(realEstatePurchaseFees.getDetails().notaryFees,  5275.41));
    }

    @Test
    public void should_return_dmto_cost_part(){
        final RealEstatePurchaseFees realEstatePurchaseFees = RealEstatePurchaseFees.buildFrom(500000, "ancien", "95240");
        Assert.assertEquals(0, Double.compare(realEstatePurchaseFees.getDetails().totalTax, 30605.08));
    }
}