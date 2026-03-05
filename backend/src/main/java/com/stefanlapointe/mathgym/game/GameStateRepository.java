package com.stefanlapointe.mathgym.game;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GameStateRepository extends JpaRepository<GameState, UUID> {
    Optional<GameState> findByIdAndUserId(UUID id, Long userId);
    List<GameState> findByUserId(Long userId);
}
