package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "enrollments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Enrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnoreProperties({"user", "hibernateLazyInitializer", "handler"})
    private Student student;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Course course;
    
    @Enumerated(EnumType.STRING)
    private Semester semester;
    
    private Integer year;
    private Timestamp enrollmentDate;
    
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus enrollmentStatus;
    
    private String finalGrade;
    private BigDecimal gradePoints;
    
    @OneToOne(mappedBy = "enrollment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_points")
    @JsonIgnoreProperties({"enrollment"})
    private Grade grade;
    
    public enum Semester { 
        FALL, SPRING, SUMMER 
    }
    
    public enum EnrollmentStatus { 
        ENROLLED, DROPPED, WITHDRAWN, COMPLETED 
    }
}