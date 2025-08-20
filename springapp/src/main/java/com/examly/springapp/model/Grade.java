package com.examly.springapp.model;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
public class Grade {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "eid", nullable = false)
    private Enrollment enrollment;


    @ManyToOne
    private Faculty faculty;

    private String gradeLetter;
    private BigDecimal gradePoints;
    private Timestamp gradeDate;
    private String comments;
}
