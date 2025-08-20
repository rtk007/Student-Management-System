package com.examly.springapp.model;
import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Data
public class Course {
    @Id @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private String courseCode;

    private String courseName;
    private Integer creditHours;
    private String department;
    private String courseDescription;
    private String prerequisites;
    private Boolean isActive = true;
    private Timestamp createdDate;
}
