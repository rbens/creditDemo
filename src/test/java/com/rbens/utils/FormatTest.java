package com.rbens.utils;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.rbens.utils.Format.formatNumber;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.*;

public class FormatTest {

    private Format<Double> format;

    @Before
    public void setUp() throws Exception {
        format = new Format<Double>();
    }

    @Test
    public void testFormatNumber() throws Exception {
        assertThat(formatNumber(32.23654), is(32.24));
        assertThat(formatNumber(32.23432), is(32.23));
    }

    @Test
    public void testReverseArray() throws Exception {
        final Double[] arrayDoubleData = {2.1,3.69,125.36,87954.201,36598.0125};
        final Double[] arrayReverseDoubleData = {36598.0125,87954.201,125.36,3.69,2.1};

        assertArrayEquals(format.reverseArray(arrayDoubleData), arrayReverseDoubleData);
    }
}