package com.examly.springapp.model;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
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

    @ManyToMany(mappedBy = "assignedCourses")
    @JsonIgnore
    private List<StudentClass> classes;

    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private List<Faculty> faculties;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Integer getCreditHours() {
        return creditHours;
    }

    public void setCreditHours(Integer creditHours) {
        this.creditHours = creditHours;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    public List<StudentClass> getClasses() {
        return classes;
    }

    public void setClasses(List<StudentClass> classes) {
        this.classes = classes;
    }

    public List<Faculty> getFaculties() {
        return faculties;
    }

    public void setFaculties(List<Faculty> faculties) {
        this.faculties = faculties;
    }
}
