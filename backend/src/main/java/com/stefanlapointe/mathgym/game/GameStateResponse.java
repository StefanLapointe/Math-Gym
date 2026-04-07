package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GameStateResponse {
    private GameOptions gameOptions;
    private int problemNumber;
    private int correctAnswers;
    private long timestampMillis;
}
