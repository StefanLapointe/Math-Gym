package com.stefanlapointe.mathgym.endless;

import com.stefanlapointe.mathgym.game.GameOptions;
import com.stefanlapointe.mathgym.game.GameState;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(name = "endless_mode_game_states")
public class EndlessModeGameState extends GameState {
    @Column(nullable = false)
    private String problemType;

    EndlessModeGameState(int seed, String problemType) {
        super(seed);
        this.problemType = problemType;
    }

    @Override
    public String getGameMode() {
        return "endless";
    }

    @Override
    public GameOptions getGameOptions() {
        return new EndlessModeGameOptions(problemType);
    }
}
