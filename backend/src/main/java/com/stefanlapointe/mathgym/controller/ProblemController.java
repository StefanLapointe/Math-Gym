package com.stefanlapointe.mathgym.controller;

import com.stefanlapointe.mathgym.model.ProblemCorrection;
import com.stefanlapointe.mathgym.model.ProblemResponse;
import com.stefanlapointe.mathgym.model.ProblemStatement;
import com.stefanlapointe.mathgym.service.ProblemService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api")
public class ProblemController {
    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping("/list")
    Set<String> list() {
        return problemService.list();
    }

    @PostMapping("/generate")
    ProblemStatement generate(@RequestBody String problemType) {
        return problemService.generate(problemType);
    }

    @PostMapping("/evaluate")
    ProblemCorrection evaluate(@RequestBody ProblemResponse problemResponse){
        return problemService.evaluate(problemResponse);
    }
}
