package com.examly.springapp.controller;

import com.examly.springapp.model.AcademicProgram;
import com.examly.springapp.service.AcademicProgramService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic-programs")
@CrossOrigin(origins = "*")
public class AcademicProgramController {

    private final AcademicProgramService service;

    public AcademicProgramController(AcademicProgramService service) {
        this.service = service;
    }

    @GetMapping
    public List<AcademicProgram> getAllPrograms() {
        return service.getAllPrograms();
    }

    @GetMapping("/{id}")
    public AcademicProgram getProgram(@PathVariable Long id) {
        return service.getProgramById(id);
    }

    @PostMapping
    public AcademicProgram createProgram(@RequestBody AcademicProgram program) {
        return service.createProgram(program);
    }

    @PutMapping("/{id}")
    public AcademicProgram updateProgram(@PathVariable Long id, @RequestBody AcademicProgram program) {
        return service.updateProgram(id, program);
    }

    @DeleteMapping("/{id}")
    public void deleteProgram(@PathVariable Long id) {
        service.deleteProgram(id);
    }
}
