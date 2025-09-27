package com.stefanlapointe.mathgym.routine;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {
    private final RoutineService routineService;

    RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @GetMapping("/{routineId}")
    Routine getRoutine(@PathVariable("routineId") String routineId) {
        return routineService.getRoutineById(routineId);
    }
}
