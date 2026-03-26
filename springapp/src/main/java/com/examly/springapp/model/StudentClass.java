package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
public class StudentClass {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String className;
    private String sectionName;

    @ManyToMany
    @JoinTable(
        name = "class_course",
        joinColumns = @JoinColumn(name = "class_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> assignedCourses;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public List<Course> getAssignedCourses() {
        return assignedCourses;
    }

    public void setAssignedCourses(List<Course> assignedCourses) {
        this.assignedCourses = assignedCourses;
    }
}
