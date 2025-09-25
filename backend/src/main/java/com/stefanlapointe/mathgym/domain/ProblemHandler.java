package com.stefanlapointe.mathgym.domain;

public interface ProblemHandler {
    String generateStatement(long seed);
    boolean isCorrect(long seed, String attempt);
    String generateSolution(long seed);
}
