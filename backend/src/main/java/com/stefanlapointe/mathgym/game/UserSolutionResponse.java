package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

// Backend as source of truth for number of correct answers.
@AllArgsConstructor
@Getter
public class UserSolutionResponse {
    private boolean isCorrect;
    private String correction;
    private int correctAnswers;
    private boolean gameOver;
}
