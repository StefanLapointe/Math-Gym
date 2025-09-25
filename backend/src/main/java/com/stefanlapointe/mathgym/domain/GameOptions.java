package com.stefanlapointe.mathgym.domain;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.stefanlapointe.mathgym.endless.EndlessModeGameOptions;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "gameMode")
@JsonSubTypes(
        @JsonSubTypes.Type(value = EndlessModeGameOptions.class, name = "endless")
)
public abstract class GameOptions implements HasGameMode {
}
