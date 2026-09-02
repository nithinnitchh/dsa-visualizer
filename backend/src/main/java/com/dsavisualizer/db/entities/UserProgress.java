package com.dsavisualizer.db.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * User progress tracking entity.
 */
@Entity
@Table(name = "user_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProgress {
    
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
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @Column(name = "viewed_at")
    private LocalDateTime viewedAt;
    
    @Column(name = "completion_score")
    private Integer completionScore;
    
    @Column(name = "times_attempted")
    @Builder.Default
    private Integer timesAttempted = 0;
    
    @PrePersist
    protected void onCreate() {
        viewedAt = LocalDateTime.now();
    }
}
