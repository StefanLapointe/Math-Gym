package com.stefanlapointe.mathgym.game;

import com.stefanlapointe.mathgym.problem.ProblemService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Supplier;

@Service
public class GameService {
    private final Map<String, GameModeHandler> gameModeHandlerMap;
    private final ProblemService problemService;
    private final GameStateRepository gameStateRepository;

    GameService(Map<String, GameModeHandler> gameModeHandlerMap, ProblemService problemService, GameStateRepository gameStateRepository) {
        this.gameModeHandlerMap = gameModeHandlerMap;
        this.problemService = problemService;
        this.gameStateRepository = gameStateRepository;
    }

    /**
     * Guest overload.
     */
    public String generate(GameOptions gameOptions, int problemNumber, int seed) {
        String gameMode = gameOptions.getGameMode();
        GameModeHandler handler = gameModeHandlerMap.get(gameMode);
        String problemType = handler.decideProblemType(gameOptions, problemNumber);
        return problemService.generate(problemType, seed);
    }

    /**
     * User overload.
     */
    public UserProblemResponse generate(UUID gameId, Long userId) {
        GameState gameState = gameStateRepository
                .findByIdAndUserId(gameId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        GameOptions gameOptions = gameState.getGameOptions();
        int problemNumber = gameState.getProblemNumber();
        int seed = gameState.getSeed();
        String statement = generate(gameOptions, problemNumber, seed);
        return new UserProblemResponse(problemNumber, statement);
    }

    /**
     * Guest overload.
     */
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

    /**
     * User overload.
     */
    public UserSolutionResponse correct(UUID gameId, Long userId, String attempt) {
        // Unpack everything.
        GameState gameState = gameStateRepository
                .findByIdAndUserId(gameId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        GameOptions gameOptions = gameState.getGameOptions();
        int problemNumber = gameState.getProblemNumber();
        int correctAnswers = gameState.getCorrectAnswers();
        int seed = gameState.getSeed();

        // Reuse the guest overload for update logic.
        GuestSolutionResponse guestSolutionResponse = correct(gameOptions, problemNumber, correctAnswers, seed, attempt);
        boolean isCorrect = guestSolutionResponse.isCorrect();
        String correction = guestSolutionResponse.getCorrection();
        boolean gameOver = guestSolutionResponse.isGameOver();
        problemNumber++;
        if (isCorrect) correctAnswers++;
        seed++; // This ensures that each question uses a different seed.

        // Persist the changes.
        if (gameOver) {
            gameStateRepository.deleteById(gameId);
        } else {
            gameState.setProblemNumber(problemNumber);
            gameState.setCorrectAnswers(correctAnswers);
            gameState.setSeed(seed);
            gameStateRepository.save(gameState);
        }

        return new UserSolutionResponse(isCorrect, correction, correctAnswers, gameOver);
    }

    public UUID newGame(GameOptions gameOptions, int seed) {
        String gameMode = gameOptions.getGameMode();
        GameModeHandler handler = gameModeHandlerMap.get(gameMode);
        return handler.newGame(gameOptions, seed);
    }

    public List<UUID> getGameIds(Long userId) {
        List<GameState> gameStates = gameStateRepository.findByUserId(userId);
        return gameStates
                .stream()
                .map(GameState::getId)
                .toList();
    }

    public GameState getGameState(UUID gameId, Long userId) {
        return gameStateRepository
                .findByIdAndUserId(gameId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
