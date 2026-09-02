package com.dsavisualizer.api.services;

import com.dsavisualizer.api.dto.AuthResponse;
import com.dsavisualizer.api.dto.LoginRequest;
import com.dsavisualizer.api.dto.RegisterRequest;
import com.dsavisualizer.api.dto.UserProfileDto;
import com.dsavisualizer.config.JwtTokenProvider;
import com.dsavisualizer.db.entities.User;
import com.dsavisualizer.db.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Authentication and user management service.
 */
@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    /**
     * Register a new user.
     */
    public AuthResponse register(RegisterRequest request) {
        // Validate request
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        
        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        
        user = userRepository.save(user);
        
        // Generate token
        String token = jwtTokenProvider.generateToken(user.getEmail());
        
        return AuthResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .token(token)
                .type("Bearer")
                .expiresIn(86400L) // 24 hours
                .build();
    }
    
    /**
     * Login user.
     */
    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOpt.get();
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        
        // Generate token
        String token = jwtTokenProvider.generateToken(user.getEmail());
        
        return AuthResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .token(token)
                .type("Bearer")
                .expiresIn(86400L)
                .build();
    }
    
    /**
     * Get user profile by email.
     */
    public UserProfileDto getUserProfile(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        
        User user = userOpt.get();
        
        return UserProfileDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .createdAt(user.getCreatedAt().toString())
                .build();
    }
    
    /**
     * Get user by email.
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
