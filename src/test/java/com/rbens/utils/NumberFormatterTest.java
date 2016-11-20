package com.rbens.utils;

import org.junit.Test;

import static com.rbens.utils.NumberFormatter.formatNumberToDoubleValue;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class NumberFormatterTest {

    final Double num1 = 32.23654;
    final Double num2 = 32.23432;

    @Test
    public void testFormatNumber() throws Exception {
        assertThat(formatNumberToDoubleValue(num1), is(32.24));
        assertThat(formatNumberToDoubleValue(num2), is(32.23));
    }

}