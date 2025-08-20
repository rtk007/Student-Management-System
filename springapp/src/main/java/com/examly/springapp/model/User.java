package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    // Store encoded password only
    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false)
    private Integer institutionId = 1;

    private Timestamp createdDate;
    private Timestamp lastLogin;

    private Boolean isActive = true;
    private Boolean emailVerified = false;

    public enum Role {
        STUDENT, FACULTY, REGISTRAR, ADMIN
    }
}
