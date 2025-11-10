package com.stefanlapointe.mathgym.problem;

public interface ProblemHandler {
    String generateStatement(long seed);
    boolean isCorrect(long seed, String attempt);
    String generateSolution(long seed);
}
