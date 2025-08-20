package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Data
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Foreign key mapping to User table
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // user_id will be FK column
    private User user;
    
    @Column(name = "student_id",nullable = false, unique = true)
    private String studentId;

    private String studentName;
    private String studentCity;
    private String phone;
    private String enrolledIn;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Kolkata")
    private LocalDate birthdate;
    @Enumerated(EnumType.STRING)
    private StudentType studentType;

    private String lastAttendedSchool;
    private Date admissionDate;
    private Integer expectedGraduation;
    private BigDecimal currentGpa;
    private Integer totalCredits;

    @Enumerated(EnumType.STRING)
    private Standing academicStanding;

    public enum StudentType {
        FULL_TIME, PART_TIME, GRADUATE, UNDERGRADUATE
    }

    public enum Standing {
        GOOD, PROBATION, SUSPENSION, DISMISSED
    }
}
