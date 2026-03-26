package com.examly.springapp.model;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
@Entity
@Data
public class AcademicProgram {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String programCode;

    private String programName;

    @Enumerated(EnumType.STRING)
    private DegreeType degreeType;

    private String department;
    private Integer creditHoursRequired;
    private String programDescription;
    private String admissionRequirements;

    private Boolean isActive = true;
    private Timestamp createdDate;

    public enum DegreeType {
        ASSOCIATE, BACHELOR, MASTER, DOCTORAL, CERTIFICATE
    }
}
