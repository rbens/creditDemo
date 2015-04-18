package com.rbens.utils;

import java.text.DecimalFormat;
import java.text.NumberFormat;

import static java.lang.Double.valueOf;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public class Format<T> {

    public static double formatNumber(Double aDouble){
        NumberFormat f = NumberFormat.getInstance();
        String format = "0";
        if (f instanceof DecimalFormat) {
            ((DecimalFormat) f).setDecimalSeparatorAlwaysShown(true);
            ((DecimalFormat) f).applyPattern("0.00");
            format = f.format(aDouble);
        }

        return valueOf(format);
    }

    public T[] reverseArray(T[] anArray){
        for(int i = 0; i < anArray.length / 2; i++)
        {
            T temp = anArray[i];
            anArray[i] = anArray[anArray.length - i - 1];
            anArray[anArray.length - i - 1] = temp;
        }

        return anArray;
    }

}
