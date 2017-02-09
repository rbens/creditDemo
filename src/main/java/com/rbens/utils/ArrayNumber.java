package com.rbens.utils;


public class ArrayNumber {

    public static<T extends Number>  T[] reverseArray(T[] numberArray){
        for(int i = 0; i < numberArray.length / 2; i++)
        {
            T temp = numberArray[i];
            numberArray[i] = numberArray[numberArray.length - i - 1];
            numberArray[numberArray.length - i - 1] = temp;
        }

        return numberArray;
    }

}
