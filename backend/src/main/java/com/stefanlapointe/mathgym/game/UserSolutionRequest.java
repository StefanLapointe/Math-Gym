package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

// Only the attempt field is needed since everything else will be kept track of by DB.
@AllArgsConstructor
@Getter
public class UserSolutionRequest {
    private String attempt;
}
