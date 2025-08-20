package com.examly.springapp.model;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.sql.Timestamp; 
@Entity
@Data
public class AcademicRecord {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Student student;

    @Enumerated(EnumType.STRING)
    private Enrollment.Semester semester;

    private Integer year;
    private BigDecimal semesterGpa;
    private Integer semesterCredits;
    private BigDecimal cumulativeGpa;
    private Integer totalCredits;

    @Enumerated(EnumType.STRING)
    private Student.Standing academicStanding;

    private Timestamp recordDate;
}

