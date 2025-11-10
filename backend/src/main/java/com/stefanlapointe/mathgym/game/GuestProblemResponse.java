package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GuestProblemResponse {
    private String statement;
    private int seed;
}
