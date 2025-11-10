package com.stefanlapointe.mathgym.endless;

import com.stefanlapointe.mathgym.game.GameOptions;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class EndlessModeGameOptions extends GameOptions {
    private String problemType;

    @Override
    public String getGameMode() {
        return "endless";
    }
}
