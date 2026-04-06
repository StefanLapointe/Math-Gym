package com.stefanlapointe.mathgym.problem;

import org.springframework.stereotype.Component;

import java.util.Objects;

@Component("square")
public class SquareProblemHandler implements ProblemHandler {
    @Override
    public String generateStatement(long seed) {
        var fact = new SquareFact(seed);
        return String.format("What is the square of %d?", fact.getRoot());
    }

    @Override
    public boolean isCorrect(long seed, String attempt) {
        return Objects.equals(attempt, generateSolution(seed));
    }

    @Override
    public String generateSolution(long seed) {
        var fact = new SquareFact(seed);
        return "" + fact.getSquare();
    }
}
