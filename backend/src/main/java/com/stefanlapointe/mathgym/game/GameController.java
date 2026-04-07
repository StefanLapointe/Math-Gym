package com.stefanlapointe.mathgym.game;

import com.stefanlapointe.mathgym.user.UserDetailsImpl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/games")
public class GameController {
    private final Random random = new Random();
    private final GameService gameService;

    GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/guest/problem")
    GuestProblemResponse guestProblem(@RequestBody GuestProblemRequest guestProblemRequest) {
        GameOptions gameOptions = guestProblemRequest.getGameOptions();
        int problemNumber = guestProblemRequest.getProblemNumber();
        int seed = random.nextInt();
        String statement = gameService.generate(gameOptions, problemNumber, seed);
        return new GuestProblemResponse(statement, seed);
    }

    @PostMapping("/guest/solution")
    GuestSolutionResponse guestSolution(@RequestBody GuestSolutionRequest guestSolutionRequest) {
        GameOptions gameOptions = guestSolutionRequest.getGameOptions();
        int problemNumber = guestSolutionRequest.getProblemNumber();
        int correctAnswers = guestSolutionRequest.getCorrectAnswers();
        int seed = guestSolutionRequest.getSeed();
        String attempt = guestSolutionRequest.getAttempt();
        return gameService.correct(gameOptions, problemNumber, correctAnswers, seed, attempt);
    }

    // No "UserProblemRequest" is needed since the game state will come from DB.
    @GetMapping("/{gameId}/problem")
    UserProblemResponse userProblem(@PathVariable UUID gameId, @AuthenticationPrincipal UserDetailsImpl principal) {
        Long userId = principal.getId();
        return gameService.generate(gameId, userId);
    }

    @PostMapping("/{gameId}/solution")
    UserSolutionResponse userSolution(@PathVariable UUID gameId, @AuthenticationPrincipal UserDetailsImpl principal, @RequestBody UserSolutionRequest userSolutionRequest) {
        Long userId = principal.getId();
        String attempt = userSolutionRequest.getAttempt();
        return gameService.correct(gameId, userId, attempt);
    }

    // Start a new game
    @PostMapping("")
    NewGameResponse newGame(@RequestBody NewGameRequest newGameRequest) {
        GameOptions gameOptions = newGameRequest.getGameOptions();
        int seed = random.nextInt();
        UUID gameId = gameService.newGame(gameOptions, seed);
        return new NewGameResponse(gameId.toString());
    }

    // Get a list of all ongoing games
    @GetMapping("")
    List<UUID> games(@AuthenticationPrincipal UserDetailsImpl principal) {
        Long userId = principal.getId();
        return gameService.getGameIds(userId);
    }

    // Obtain the state of an ongoing game
    @GetMapping("/{gameId}")
    GameStateResponse gameState(@PathVariable UUID gameId, @AuthenticationPrincipal UserDetailsImpl principal) {
        Long userId = principal.getId();
        GameState gameState = gameService.getGameState(gameId, userId);
        GameOptions gameOptions = gameState.getGameOptions();
        int problemNumber = gameState.getProblemNumber();
        int correctAnswers = gameState.getCorrectAnswers();
	long timestampMillis = gameState.getCreatedAt().toEpochMilli();
        return new GameStateResponse(gameOptions, problemNumber, correctAnswers, timestampMillis);
    }
}
