package com.stefanlapointe.mathgym.component;

import com.stefanlapointe.mathgym.domain.AdditionSubtractionFact;
import com.stefanlapointe.mathgym.domain.MultiplicationDivisionFact;
import com.stefanlapointe.mathgym.domain.ProblemHandler;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component("multiplication")
public class MultiplicationProblemHandler implements ProblemHandler {
    @Override
    public String generateStatement(long seed) {
        var fact = new MultiplicationDivisionFact(seed);
        return String.format("What is the value of %d * %d?",
                fact.getOperand1(),
                fact.getOperand2());
    }

    @Override
    public boolean isCorrect(long seed, String response) {
        return Objects.equals(response, generateSolution(seed));
    }

    @Override
    public String generateSolution(long seed) {
        var fact = new MultiplicationDivisionFact(seed);
        return "" + fact.getProduct();
    }
}
