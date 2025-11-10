package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GuestSolutionResponse {
    private boolean isCorrect;
    private String correction;
    private boolean gameOver;
}
