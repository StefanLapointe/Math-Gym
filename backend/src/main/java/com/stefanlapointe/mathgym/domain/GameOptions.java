package com.stefanlapointe.mathgym.domain;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.stefanlapointe.mathgym.endless.EndlessModeGameOptions;
import com.stefanlapointe.mathgym.routine.RoutineModeGameOptions;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "gameMode")
@JsonSubTypes({
        @JsonSubTypes.Type(value = EndlessModeGameOptions.class, name = "endless"),
        @JsonSubTypes.Type(value = RoutineModeGameOptions.class, name = "routine")
})
public abstract class GameOptions implements HasGameMode {
}
