package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

// Backend as source of truth for problem number.
// No seed field is needed since the DB will keep track of that.
@AllArgsConstructor
@Getter
public class UserProblemResponse {
    private int problemNumber;
    private String statement;
}
