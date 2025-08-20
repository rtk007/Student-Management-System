package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import com.examly.springapp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Registration endpoint
    @PostMapping("/register")
    public Object registerUser(@RequestBody User user) {
        try {
            System.out.println("=== REGISTRATION DEBUG ===");
            System.out.println("Received registration request for: " + user.getUsername());
            System.out.println("Email: " + user.getEmail());
            System.out.println("Role: " + user.getRole());
            System.out.println("Password received: " + (user.getPasswordHash() != null && !user.getPasswordHash().isEmpty()));
            
            User savedUser = userService.registerUser(user);
            System.out.println("User registered successfully with ID: " + savedUser.getId());
            System.out.println("=== REGISTRATION SUCCESS ===");
            
            return Map.of("message", "SUCCESS");
        } catch (Exception e) {
            System.out.println("=== REGISTRATION ERROR ===");
            System.out.println("Registration failed: " + e.getMessage());
            e.printStackTrace();
            return Map.of("error", e.getMessage());
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> loginRequest) {
        try {
            String username = loginRequest.get("username");
            String password = loginRequest.get("password");
            
            // Debug logging
            System.out.println("=== LOGIN DEBUG ===");
            System.out.println("Received username: '" + username + "'");
            System.out.println("Password received: " + (password != null && !password.isEmpty()));
            System.out.println("Password length: " + (password != null ? password.length() : 0));
            System.out.println("Request keys: " + loginRequest.keySet());
            System.out.println("All request data: " + loginRequest);
            
            // Validate input
            if (username == null || username.trim().isEmpty()) {
                System.out.println("Username is null or empty");
                return Map.of("error", "Username is required");
            }
            
            if (password == null || password.isEmpty()) {
                System.out.println("Password is null or empty");
                return Map.of("error", "Password is required");
            }

            // Find user
            User user = userService.findByUsername(username.trim());
            if (user == null) {
                System.out.println("User not found for username: '" + username + "'");
                // Also try finding by email in case username is actually email
                user = userService.findByEmail(username.trim());
                if (user == null) {
                    System.out.println("User not found by email either: '" + username + "'");
                    return Map.of("error", "Invalid username");
                }
                System.out.println("User found by email: " + user.getUsername());
            } else {
                System.out.println("User found by username: " + user.getUsername());
            }
            
            System.out.println("User details:");
            System.out.println("- ID: " + user.getId());
            System.out.println("- Username: " + user.getUsername());
            System.out.println("- Email: " + user.getEmail());
            System.out.println("- Role: " + user.getRole());
            System.out.println("- Active: " + user.getIsActive());
            System.out.println("- Password hash exists: " + (user.getPasswordHash() != null));
            if (user.getPasswordHash() != null) {
                System.out.println("- Password hash length: " + user.getPasswordHash().length());
                System.out.println("- Password hash preview: " + user.getPasswordHash().substring(0, Math.min(10, user.getPasswordHash().length())) + "...");
            }

            // Check if user is active
            if (user.getIsActive() != null && !user.getIsActive()) {
                System.out.println("User account is inactive");
                return Map.of("error", "Account is inactive");
            }

            // Verify password
            boolean passwordMatch = userService.checkPassword(password, user.getPasswordHash());
            System.out.println("Password check result: " + passwordMatch);
            
            if (!passwordMatch) {
                System.out.println("Password verification failed for user: " + username);
                return Map.of("error", "Invalid password");
            }

            // Generate JWT token
            String token = jwtUtil.generateToken(user.getUsername());
            System.out.println("Token generated successfully");
            System.out.println("Token preview: " + token.substring(0, Math.min(20, token.length())) + "...");
            System.out.println("=== LOGIN SUCCESS ===");

            return Map.of(
                    "token", token,
                    "role", user.getRole().name()
            );
            
        } catch (Exception e) {
            System.out.println("=== LOGIN ERROR ===");
            System.out.println("Exception type: " + e.getClass().getSimpleName());
            System.out.println("Exception message: " + e.getMessage());
            e.printStackTrace();
            return Map.of("error", "Login failed: " + e.getMessage());
        }
    }
}