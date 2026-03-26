// model/Notification.java
package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    private String type; // e.g. "GRADE_UPDATE", "ENROLLMENT", etc.

    @Column(nullable = false)
    private Boolean isRead = false;

    @Column(nullable = false)
    private Timestamp createdDate = new Timestamp(System.currentTimeMillis());

    private String priority; // e.g. HIGH, MEDIUM, LOW

    private String category; // e.g. "SYSTEM", "ACADEMIC", etc.
}
