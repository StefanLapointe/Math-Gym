package com.stefanlapointe.mathgym.controller;

import com.stefanlapointe.mathgym.domain.GameOptions;
import com.stefanlapointe.mathgym.model.GuestProblemRequest;
import com.stefanlapointe.mathgym.model.GuestProblemResponse;
import com.stefanlapointe.mathgym.model.GuestSolutionRequest;
import com.stefanlapointe.mathgym.model.GuestSolutionResponse;
import com.stefanlapointe.mathgym.service.GameService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Random;

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
        String problemType = guestSolutionRequest.getProblemType();
        int seed = guestSolutionRequest.getSeed();
        String attempt = guestSolutionRequest.getAttempt();
        Optional<String> solution = gameService.correct(problemType, seed, attempt);
        String correction = solution
                .map(s -> String.format("Incorrect: the correct answer is %s.", s))
                .orElse("Correct!");
        return new GuestSolutionResponse(solution.isEmpty(), correction);
    }
}
