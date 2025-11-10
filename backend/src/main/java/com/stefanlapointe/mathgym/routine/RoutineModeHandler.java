package com.stefanlapointe.mathgym.routine;

import com.stefanlapointe.mathgym.game.GameModeHandler;
import com.stefanlapointe.mathgym.game.GameOptions;
import org.springframework.stereotype.Component;

@Component("routine")
public class RoutineModeHandler implements GameModeHandler {
    private final RoutineService routineService;

    RoutineModeHandler(RoutineService routineService) {
        this.routineService = routineService;
    }

    @Override
    public String decideProblemType(GameOptions gameOptions, int problemNumber) {
        RoutineModeGameOptions routineModeGameOptions = (RoutineModeGameOptions) gameOptions;
        String routineId = routineModeGameOptions.getRoutineId();
        Routine routine =routineService.getRoutineById(routineId);
        return routine.decideProblemType(problemNumber);
    }

    @Override
    public boolean decideGameOver(GameOptions gameOptions, int problemNumber, int correctAnswers) {
        RoutineModeGameOptions routineModeGameOptions = (RoutineModeGameOptions) gameOptions;
        String routineId = routineModeGameOptions.getRoutineId();
        Routine routine = routineService.getRoutineById(routineId);
        return problemNumber >= routine.getLength();
    }
}
