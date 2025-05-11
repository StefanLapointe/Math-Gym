package com.stefanlapointe.mathgym.domain;

public interface ProblemHandler {
    String generateStatement(long seed);
    boolean isCorrect(long seed, String response);
    String generateSolution(long seed);
}
