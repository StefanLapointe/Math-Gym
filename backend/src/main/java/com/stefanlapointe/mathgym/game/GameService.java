package com.stefanlapointe.mathgym.game;

import com.stefanlapointe.mathgym.problem.ProblemService;
import org.springframework.stereotype.Service;

import java.util.Map;

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

    public GuestSolutionResponse correct(GameOptions gameOptions, int problemNumber, int correctAnswers, int seed, String attempt) {
        String gameMode = gameOptions.getGameMode();
        GameModeHandler handler = gameModeHandlerMap.get(gameMode);
        String problemType = handler.decideProblemType(gameOptions, problemNumber);
        boolean isCorrect = problemService.isCorrect(problemType, seed, attempt);
        if (isCorrect) correctAnswers++;
        boolean gameOver = handler.decideGameOver(gameOptions, problemNumber, correctAnswers);
        if (isCorrect) {
            return new GuestSolutionResponse(true, "Correct!", gameOver);
        }
        String solution = problemService.solve(problemType, seed);
        String correction = String.format("Incorrect: The correct answer is %s.", solution);
        return new GuestSolutionResponse(false, correction, gameOver);
    }
}
