package com.stefanlapointe.mathgym.endless;

import com.stefanlapointe.mathgym.game.GameModeHandler;
import com.stefanlapointe.mathgym.game.GameOptions;
import com.stefanlapointe.mathgym.game.GameStateRepository;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("endless")
public class EndlessModeHandler implements GameModeHandler {
    private final GameStateRepository gameStateRepository;

    EndlessModeHandler(GameStateRepository gameStateRepository) {
        this.gameStateRepository = gameStateRepository;
    }

    @Override
    public String decideProblemType(GameOptions gameOptions, int problemNumber) {
        EndlessModeGameOptions endlessModeGameOptions = (EndlessModeGameOptions) gameOptions;
        return endlessModeGameOptions.getProblemType();
    }

    @Override
    public boolean decideGameOver(GameOptions gameOptions, int problemNumber, int correctAnswers) {
        return problemNumber >= correctAnswers + 3;
    }

    @Override
    public UUID newGame(GameOptions gameOptions, int seed) {
        EndlessModeGameOptions endlessModeGameOptions = (EndlessModeGameOptions) gameOptions;
        String problemType = endlessModeGameOptions.getProblemType();
        EndlessModeGameState endlessModeGameState = new EndlessModeGameState(seed, problemType);
        gameStateRepository.save(endlessModeGameState);
        return endlessModeGameState.getId();
    }
}
