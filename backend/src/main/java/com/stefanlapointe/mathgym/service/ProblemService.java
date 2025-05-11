package com.stefanlapointe.mathgym.service;

import com.stefanlapointe.mathgym.domain.ProblemHandler;
import com.stefanlapointe.mathgym.model.ProblemCorrection;
import com.stefanlapointe.mathgym.model.ProblemResponse;
import com.stefanlapointe.mathgym.model.ProblemStatement;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.Set;

@Service
public class ProblemService {
    private final Map<String, ProblemHandler> problemHandlerMap;

    public ProblemService(Map<String, ProblemHandler> problemHandlerMap) {
        this.problemHandlerMap = problemHandlerMap;
    }

    public Set<String> list() {
        return problemHandlerMap.keySet();
    }

    public ProblemStatement generate(String problemType) {
        ProblemHandler problemHandler = problemHandlerMap.get(problemType);
        Random random = new Random();
        long seed = random.nextLong();
        String statement = problemHandler.generateStatement(seed);
        return new ProblemStatement(seed, statement);
    }

    public ProblemCorrection evaluate(ProblemResponse problemResponse) {
        String problemType = problemResponse.getProblemType();
        long seed = problemResponse.getSeed();
        String response = problemResponse.getResponse();
        ProblemHandler problemHandler = problemHandlerMap.get(problemType);
        boolean isCorrect = problemHandler.isCorrect(seed, response);
        String correction;
        if (isCorrect) {
            correction = "Correct!";
        } else {
            String format = "Incorrect: The correct answer is %s.";
            String solution = problemHandler.generateSolution(seed);
            correction = String.format(format, solution);
        }
        return new ProblemCorrection(isCorrect, correction);
    }
}
