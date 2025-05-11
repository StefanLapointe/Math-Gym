package com.stefanlapointe.mathgym.domain;

import lombok.Getter;

import java.util.Random;

@Getter
public class AdditionSubtractionFact {
    private final int operand1;
    private final int operand2;
    private final int sum;

    public AdditionSubtractionFact(long seed) {
        Random random = new Random(seed);
        operand1 = random.nextInt(100);
        operand2 = random.nextInt(100);
        sum = operand1 + operand2;
    }
}
