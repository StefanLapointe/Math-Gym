package com.stefanlapointe.mathgym.component;

import com.stefanlapointe.mathgym.domain.AdditionSubtractionFact;
import com.stefanlapointe.mathgym.domain.ProblemHandler;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component("subtraction")
public class SubtractionProblemHandler implements ProblemHandler {
    @Override
    public String generateStatement(long seed) {
        var fact = new AdditionSubtractionFact(seed);
        return String.format("What is the value of %d - %d?",
                fact.getSum(),
                fact.getOperand2());
    }

    @Override
    public boolean isCorrect(long seed, String response) {
        return Objects.equals(response, generateSolution(seed));
    }

    @Override
    public String generateSolution(long seed) {
        var fact = new AdditionSubtractionFact(seed);
        return "" + fact.getOperand1();
    }
}
