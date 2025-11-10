package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GuestSolutionRequest {
    private GameOptions gameOptions;
    private int problemNumber;
    private int correctAnswers;
    private int seed;
    private String attempt;
}
