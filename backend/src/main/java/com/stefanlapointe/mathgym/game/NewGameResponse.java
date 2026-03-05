package com.stefanlapointe.mathgym.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class NewGameResponse {
    // I think this should be a UUID, both to avoid number length issues
    // and to avoid unnecessarily leaking information about game creation
    private String gameId;
}
