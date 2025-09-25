package com.stefanlapointe.mathgym.service;

import com.stefanlapointe.mathgym.domain.GameModeHandler;
import com.stefanlapointe.mathgym.domain.GameOptions;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class GameService {
    private final Map<String, GameModeHandler> gameModeHandlerMap;
    private final ProblemService problemService;

    GameService(Map<String, GameModeHandler> gameModeHandlerMap, ProblemService problemService) {
        this.gameModeHandlerMap = gameModeHandlerMap;
        this.problemService = problemService;
    }

    public String generate(GameOptions gameOptions, int problemNumber, int seed) {
        String gameMode = gameOptions.getGameMode();
        GameModeHandler handler = gameModeHandlerMap.get(gameMode);
        String problemType = handler.decideProblemType(gameOptions, problemNumber);
        return problemService.generate(problemType, seed);
    }

    public Optional<String> correct(String problemType, int seed, String attempt) {
        boolean isCorrect = problemService.isCorrect(problemType, seed, attempt);
        return isCorrect
                ? Optional.empty()
                : Optional.of(problemService.solve(problemType, seed));
    }
}
