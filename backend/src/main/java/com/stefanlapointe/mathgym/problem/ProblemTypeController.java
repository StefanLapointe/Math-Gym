package com.stefanlapointe.mathgym.problem;

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
