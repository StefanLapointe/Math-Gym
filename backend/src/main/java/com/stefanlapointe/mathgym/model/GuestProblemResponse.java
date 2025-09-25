package com.stefanlapointe.mathgym.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GuestProblemResponse {
    private String statement;
    private int seed;
}
