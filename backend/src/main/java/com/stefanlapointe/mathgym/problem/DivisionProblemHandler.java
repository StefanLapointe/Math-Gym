package com.stefanlapointe.mathgym.problem;

import org.springframework.stereotype.Component;

import java.util.Objects;

@Component("division")
public class DivisionProblemHandler implements ProblemHandler {
    @Override
    public String generateStatement(long seed) {
        var fact = new MultiplicationDivisionFact(seed);
        return String.format("What is the value of %d / %d?",
                fact.getProduct(),
                fact.getOperand2());
    }

    @Override
    public boolean isCorrect(long seed, String attempt) {
        return Objects.equals(attempt, generateSolution(seed));
    }

    @Override
    public String generateSolution(long seed) {
        var fact = new MultiplicationDivisionFact(seed);
        return "" + fact.getOperand1();
    }
}
