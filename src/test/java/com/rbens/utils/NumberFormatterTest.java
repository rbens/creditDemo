package com.rbens.utils;


import org.junit.jupiter.api.Test;

import static com.rbens.utils.NumberFormatter.formatNumberToDoubleValue;
import static org.assertj.core.api.Assertions.assertThat;

public class NumberFormatterTest {

    final Double num1 = 32.23654;
    final Double num2 = 32.23432;

    @Test
    public void testFormatNumber() throws Exception {
        assertThat(formatNumberToDoubleValue(num1)).isEqualTo(32.24);
        assertThat(formatNumberToDoubleValue(num2)).isEqualTo(32.23);
    }

}