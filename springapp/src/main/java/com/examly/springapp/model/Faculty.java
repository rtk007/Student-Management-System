
package com.examly.springapp.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
@Entity
@Data
public class Faculty {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(unique = true, nullable = false)
    private String employeeId;
    private String name;
    private String phoneNumber;
    private String department;
    private String title;
    private String specialization;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Kolkata")
    private LocalDate hireDate;
    private String officeLocation;
    private String officeHours;
}
