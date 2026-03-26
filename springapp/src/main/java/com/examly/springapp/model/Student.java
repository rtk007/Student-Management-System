package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
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
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_class_id")
    private StudentClass studentClass;
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

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentCity() {
        return studentCity;
    }

    public void setStudentCity(String studentCity) {
        this.studentCity = studentCity;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEnrolledIn() {
        return enrolledIn;
    }

    public void setEnrolledIn(String enrolledIn) {
        this.enrolledIn = enrolledIn;
    }

    public StudentClass getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(StudentClass studentClass) {
        this.studentClass = studentClass;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public StudentType getStudentType() {
        return studentType;
    }

    public void setStudentType(StudentType studentType) {
        this.studentType = studentType;
    }

    public String getLastAttendedSchool() {
        return lastAttendedSchool;
    }

    public void setLastAttendedSchool(String lastAttendedSchool) {
        this.lastAttendedSchool = lastAttendedSchool;
    }

    public Date getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(Date admissionDate) {
        this.admissionDate = admissionDate;
    }

    public Integer getExpectedGraduation() {
        return expectedGraduation;
    }

    public void setExpectedGraduation(Integer expectedGraduation) {
        this.expectedGraduation = expectedGraduation;
    }

    public BigDecimal getCurrentGpa() {
        return currentGpa;
    }

    public void setCurrentGpa(BigDecimal currentGpa) {
        this.currentGpa = currentGpa;
    }

    public Integer getTotalCredits() {
        return totalCredits;
    }

    public void setTotalCredits(Integer totalCredits) {
        this.totalCredits = totalCredits;
    }

    public Standing getAcademicStanding() {
        return academicStanding;
    }

    public void setAcademicStanding(Standing academicStanding) {
        this.academicStanding = academicStanding;
    }
}
