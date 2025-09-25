package com.stefanlapointe.mathgym.domain;

public interface GameModeHandler {
    String decideProblemType(GameOptions gameOptions, int problemNumber);
    boolean decideGameOver(GameOptions gameOptions, int problemNumber, int correctAnswers);
}
