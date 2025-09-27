package com.stefanlapointe.mathgym.controller;

import com.stefanlapointe.mathgym.model.ProblemCorrection;
import com.stefanlapointe.mathgym.model.ProblemResponse;
import com.stefanlapointe.mathgym.model.ProblemStatement;
import com.stefanlapointe.mathgym.service.ProblemService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api")
public class ProblemTypeController {
    private final ProblemService problemService;

    public ProblemTypeController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/problem-types")
    Set<String> problemTypes() {
        return problemService.getProblemTypes();
    }
}
