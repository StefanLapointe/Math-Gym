package com.stefanlapointe.mathgym.routine;

import com.stefanlapointe.mathgym.endless.EndlessModeGameOptions;
import com.stefanlapointe.mathgym.endless.EndlessModeGameState;
import com.stefanlapointe.mathgym.game.GameModeHandler;
import com.stefanlapointe.mathgym.game.GameOptions;
import com.stefanlapointe.mathgym.game.GameStateRepository;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("routine")
public class RoutineModeHandler implements GameModeHandler {
    private final GameStateRepository gameStateRepository;
    private final RoutineService routineService;

    RoutineModeHandler(GameStateRepository gameStateRepository, RoutineService routineService) {
        this.gameStateRepository = gameStateRepository;
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

    @Override
    public UUID newGame(GameOptions gameOptions, int seed) {
        RoutineModeGameOptions routineModeGameOptions = (RoutineModeGameOptions) gameOptions;
        String routineId = routineModeGameOptions.getRoutineId();
        RoutineModeGameState routineModeGameState = new RoutineModeGameState(seed, routineId);
        gameStateRepository.save(routineModeGameState);
        return routineModeGameState.getId();
    }
}
