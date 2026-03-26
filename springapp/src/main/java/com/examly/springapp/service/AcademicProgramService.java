package com.examly.springapp.service;

import com.examly.springapp.model.AcademicProgram;
import com.examly.springapp.repository.AcademicProgramRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class AcademicProgramService {

    private final AcademicProgramRepository repository;

    public AcademicProgramService(AcademicProgramRepository repository) {
        this.repository = repository;
    }

    public List<AcademicProgram> getAllPrograms() {
        return repository.findAll();
    }

    public AcademicProgram getProgramById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AcademicProgram createProgram(AcademicProgram program) {
        if(repository.existsByProgramCode(program.getProgramCode())) {
            throw new RuntimeException("Program code already exists!");
        }
        program.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        return repository.save(program);
    }

    public AcademicProgram updateProgram(Long id, AcademicProgram programDetails) {
        Optional<AcademicProgram> optionalProgram = repository.findById(id);
        if(optionalProgram.isPresent()) {
            AcademicProgram program = optionalProgram.get();
            program.setProgramCode(programDetails.getProgramCode());
            program.setProgramName(programDetails.getProgramName());
            program.setDegreeType(programDetails.getDegreeType());
            program.setDepartment(programDetails.getDepartment());
            program.setCreditHoursRequired(programDetails.getCreditHoursRequired());
            program.setProgramDescription(programDetails.getProgramDescription());
            program.setAdmissionRequirements(programDetails.getAdmissionRequirements());
            program.setIsActive(programDetails.getIsActive());
            return repository.save(program);
        }
        return null;
    }

    public void deleteProgram(Long id) {
        repository.deleteById(id);
    }
}
