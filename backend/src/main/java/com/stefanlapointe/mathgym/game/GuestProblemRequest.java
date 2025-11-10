package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GuestProblemRequest {
    private GameOptions gameOptions;
    private int problemNumber;
}
