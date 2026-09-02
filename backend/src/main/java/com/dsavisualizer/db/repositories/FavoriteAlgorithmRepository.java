package com.dsavisualizer.db.repositories;

import com.dsavisualizer.db.entities.FavoriteAlgorithm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for FavoriteAlgorithm entity.
 */
@Repository
public interface FavoriteAlgorithmRepository extends JpaRepository<FavoriteAlgorithm, Long> {
    List<FavoriteAlgorithm> findByUserId(Long userId);
    Optional<FavoriteAlgorithm> findByUserIdAndAlgorithmName(Long userId, String algorithmName);
    boolean existsByUserIdAndAlgorithmName(Long userId, String algorithmName);
}
