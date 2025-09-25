package com.stefanlapointe.mathgym.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GuestSolutionResponse {
    private boolean isCorrect;
    private String correction;
}
