package com.stefanlapointe.mathgym.model;

import com.stefanlapointe.mathgym.domain.GameOptions;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GuestProblemRequest {
    private GameOptions gameOptions;
    private int problemNumber;
}
