package com.stefanlapointe.mathgym.domain;

import lombok.Getter;

import java.util.Random;

@Getter
public class MultiplicationDivisionFact {
    private final int operand1;
    private final int operand2;
    private final int product;

    public MultiplicationDivisionFact(long seed) {
        Random random = new Random(seed);
        operand1 = random.nextInt(10);
        operand2 = random.nextInt(10);
        product = operand1 * operand2;
    }
}
