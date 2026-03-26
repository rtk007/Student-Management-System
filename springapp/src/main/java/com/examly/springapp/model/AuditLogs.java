// model/AuditLog.java
package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "audit_logs")
public class AuditLogs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // who performed the action

    private String action; // e.g., "CREATE", "UPDATE", "DELETE", "LOGIN", etc.

    private String entityType; // e.g., "User", "Course", etc.

    private Long entityId;

    @Lob
    private String oldValue; // Serialized JSON

    @Lob
    private String newValue; // Serialized JSON

    @Column(nullable = false)
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
}
