package com.rbens.utils;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.Locale;

import static java.lang.Double.valueOf;

/**
 * Created by rbenseghir on 3/18/15.
 *
 */
public class NumberFormatter {

    private final static DecimalFormatSymbols formatSymbols = new DecimalFormatSymbols(Locale.US);

    public static<T extends Number> double formatNumberToDoubleValue(T num){
        NumberFormat f = NumberFormat.getInstance();
        String format = "0";
        if (f instanceof DecimalFormat) {
            ((DecimalFormat) f).setDecimalFormatSymbols(formatSymbols);
            ((DecimalFormat) f).setDecimalSeparatorAlwaysShown(true);
            ((DecimalFormat) f).applyPattern("0.00");
            format = f.format(num);
        }
        return valueOf(format);
    }
}
