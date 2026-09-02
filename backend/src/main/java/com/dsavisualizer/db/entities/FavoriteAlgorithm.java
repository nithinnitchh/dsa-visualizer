package com.dsavisualizer.db.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Favorite algorithm entity for users to save their favorite algorithms.
 */
@Entity
@Table(name = "favorite_algorithms", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "algorithm_name"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteAlgorithm {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String algorithmName;
    
    @Column(nullable = false)
    private String category;
}
