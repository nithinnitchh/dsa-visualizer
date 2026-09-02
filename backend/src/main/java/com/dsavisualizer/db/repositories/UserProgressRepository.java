package com.dsavisualizer.db.repositories;

import com.dsavisualizer.db.entities.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for UserProgress entity.
 */
@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUserId(Long userId);
    List<UserProgress> findByUserIdAndCategory(Long userId, String category);
    Optional<UserProgress> findByUserIdAndAlgorithmName(Long userId, String algorithmName);
}
