package com.dsavisualizer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS configuration for allowing requests from React frontend.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Value("${spring.web.cors.allowed-origins}")
    private String allowedOrigins;
    
    @Value("${spring.web.cors.allowed-methods}")
    private String allowedMethods;
    
    @Value("${spring.web.cors.allowed-headers}")
    private String allowedHeaders;
    
    @Value("${spring.web.cors.allow-credentials}")
    private Boolean allowCredentials;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = allowedOrigins.split(",");
        String[] methods = allowedMethods.split(",");
        
        registry.addMapping("/algorithms/**")
                .allowedOrigins(origins)
                .allowedMethods(methods)
                .allowedHeaders(allowedHeaders)
                .allowCredentials(allowCredentials)
                .maxAge(3600);
        
        registry.addMapping("/auth/**")
                .allowedOrigins(origins)
                .allowedMethods(methods)
                .allowedHeaders(allowedHeaders)
                .allowCredentials(allowCredentials)
                .maxAge(3600);
        
        registry.addMapping("/api/**")
                .allowedOrigins(origins)
                .allowedMethods(methods)
                .allowedHeaders(allowedHeaders)
                .allowCredentials(allowCredentials)
                .maxAge(3600);
    }
}
