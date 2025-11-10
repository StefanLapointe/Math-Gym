package com.stefanlapointe.mathgym.endless;

import com.stefanlapointe.mathgym.game.GameModeHandler;
import com.stefanlapointe.mathgym.game.GameOptions;
import org.springframework.stereotype.Component;

@Component("endless")
public class EndlessModeHandler implements GameModeHandler {
    @Override
    public String decideProblemType(GameOptions gameOptions, int problemNumber) {
        EndlessModeGameOptions endlessModeGameOptions = (EndlessModeGameOptions) gameOptions;
        return endlessModeGameOptions.getProblemType();
    }

    @Override
    public boolean decideGameOver(GameOptions gameOptions, int problemNumber, int correctAnswers) {
        return problemNumber >= correctAnswers + 3;
    }
}
