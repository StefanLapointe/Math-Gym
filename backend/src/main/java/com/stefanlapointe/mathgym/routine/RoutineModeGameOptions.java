package com.stefanlapointe.mathgym.routine;

import com.stefanlapointe.mathgym.domain.GameOptions;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RoutineModeGameOptions extends GameOptions {
    private String routineId;

    @Override
    public String getGameMode() {
        return "routine";
    }
}
