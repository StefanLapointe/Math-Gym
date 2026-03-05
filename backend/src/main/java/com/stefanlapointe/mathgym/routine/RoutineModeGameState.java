package com.stefanlapointe.mathgym.routine;

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
@Table(name = "routine_mode_game_states")
public class RoutineModeGameState extends GameState {
    @Column(nullable = false)
    private String routineId;

    RoutineModeGameState(int seed, String routineId) {
        super(seed);
        this.routineId = routineId;
    }

    @Override
    public String getGameMode() {
        return "routine";
    }

    @Override
    public GameOptions getGameOptions() {
        return new RoutineModeGameOptions(routineId);
    }
}
