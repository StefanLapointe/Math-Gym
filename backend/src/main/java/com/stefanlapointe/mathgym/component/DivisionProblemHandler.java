package com.stefanlapointe.mathgym.component;

import com.stefanlapointe.mathgym.domain.MultiplicationDivisionFact;
import com.stefanlapointe.mathgym.domain.ProblemHandler;

import java.util.Objects;

public class DivisionProblemHandler implements ProblemHandler {
    @Override
    public String generateStatement(long seed) {
        var fact = new MultiplicationDivisionFact(seed);
        return String.format("What is the value of %d / %d?",
                fact.getProduct(),
                fact.getOperand2());
    }

    @Override
    public boolean isCorrect(long seed, String response) {
        return Objects.equals(response, generateSolution(seed));
    }

    @Override
    public String generateSolution(long seed) {
        var fact = new MultiplicationDivisionFact(seed);
        return "" + fact.getOperand1();
    }
}
