package com.stefanlapointe.mathgym.problem;

import lombok.Getter;

import java.util.Random;

@Getter
public class SquareFact {
    private final int root;
    private final int square;

    public SquareFact(long seed) {
        Random random = new Random(seed);
        root = random.nextInt(20);
        square = root * root;
    }
}
