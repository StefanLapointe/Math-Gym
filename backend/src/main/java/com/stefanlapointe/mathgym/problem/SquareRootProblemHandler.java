package com.stefanlapointe.mathgym.problem;

import org.springframework.stereotype.Component;

import java.util.Objects;

@Component("square root")
public class SquareRootProblemHandler implements ProblemHandler {
    @Override
    public String generateStatement(long seed) {
        var fact = new SquareFact(seed);
        return String.format("What is the square root of %d?", fact.getSquare());
    }

    @Override
    public boolean isCorrect(long seed, String attempt) {
        return Objects.equals(attempt, generateSolution(seed));
    }

    @Override
    public String generateSolution(long seed) {
        var fact = new SquareFact(seed);
        return "" + fact.getRoot();
    }
}
