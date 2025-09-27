package com.stefanlapointe.mathgym.routine;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RoutineService {
    Map<String, Routine> inMemoryRoutines;

    RoutineService() {
        inMemoryRoutines = Map.of(
                "demo1",
                new Routine(List.of(
                        new Routine.Component("addition", 5),
                        new Routine.Component("subtraction", 5)
                )),
                "demo2",
                new Routine(List.of(
                        new Routine.Component("addition", 3),
                        new Routine.Component("subtraction", 2),
                        new Routine.Component("multiplication", 3),
                        new Routine.Component("division", 2)
                ))
        );
    }

    Routine getRoutineById(String id) {
        return inMemoryRoutines.get(id);
    }
}
