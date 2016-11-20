package com.rbens.utils;

import junit.framework.TestCase;
import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;

/**
 * Created by rbens on 19.11.16.
 */
public class ArrayNumberTest extends TestCase {

    @Test
    public void testReverseArray() throws Exception {
        final Double[] arrayDoubleData = {2.1,3.69,125.36,87954.201,36598.0125};
        final Double[] arrayReverseDoubleData = {36598.0125,87954.201,125.36,3.69,2.1};

        assertArrayEquals(ArrayNumber.reverseArray(arrayDoubleData), arrayReverseDoubleData);
    }

}