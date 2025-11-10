package com.stefanlapointe.mathgym.problem;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;

@Service
public class ProblemService {
    private final Map<String, ProblemHandler> problemHandlerMap;

    public ProblemService(Map<String, ProblemHandler> problemHandlerMap) {
        this.problemHandlerMap = problemHandlerMap;
    }

    public Set<String> getProblemTypes() {
        return problemHandlerMap.keySet();
    }

    public String generate(String problemType, int seed) {
        ProblemHandler problemHandler = problemHandlerMap.get(problemType);
        return problemHandler.generateStatement(seed);
    }

    public boolean isCorrect(String problemType, int seed, String attempt) {
        ProblemHandler problemHandler = problemHandlerMap.get(problemType);
        return problemHandler.isCorrect(seed, attempt);
    }

    public String solve(String problemType, int seed) {
        ProblemHandler problemHandler = problemHandlerMap.get(problemType);
        return problemHandler.generateSolution(seed);
    }
}
