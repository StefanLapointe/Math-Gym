package com.stefanlapointe.mathgym.game;

/*
 * This interface allows the strategy pattern to be used for game modes.
 * The decideProblemType() method is run when a user requests a new problem.
 * The decideGameOver() method is run when a user requests a solution.
 * The value of correctAnswers includes the problem that has just been answered.
 */
public interface GameModeHandler {
    String decideProblemType(GameOptions gameOptions, int problemNumber);
    boolean decideGameOver(GameOptions gameOptions, int problemNumber, int correctAnswers);
}
