package com.stefanlapointe.mathgym.game;

import com.stefanlapointe.mathgym.user.UserDetailsImpl;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "game_states")
@Inheritance(strategy = InheritanceType.JOINED)
abstract public class GameState implements HasGameMode {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private Integer seed;

    @Column(nullable = false)
    private Integer problemNumber;

    @Column(nullable = false)
    private Integer correctAnswers;

    @Column(nullable = false)
    private Long userId;

    protected GameState(int seed) {
        this.seed = seed;
        problemNumber = 1;
        correctAnswers = 0;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userId = ((UserDetailsImpl) principal).getId();
    }

    public abstract GameOptions getGameOptions();
}
