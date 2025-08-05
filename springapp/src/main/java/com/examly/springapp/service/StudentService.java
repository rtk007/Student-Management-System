package com.examly.springapp.service;

import com.examly.springapp.exception.InvalidPhoneException;
import com.examly.springapp.model.Student;
import com.examly.springapp.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    public Student addStudent(Student student) {
        if (!student.getPhone().matches("\\d{10}")) {
            throw new InvalidPhoneException("Invalid phone number. It must be 10 digits.");
        }
        return studentRepo.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
}
