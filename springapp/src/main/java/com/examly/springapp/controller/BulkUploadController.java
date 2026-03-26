package com.examly.springapp.controller;

import com.examly.springapp.service.CsvService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/bulk-upload")
public class BulkUploadController {

    private final CsvService csvService;

    public BulkUploadController(CsvService csvService) {
        this.csvService = csvService;
    }

    @PostMapping("/students")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> uploadStudents(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        try {
            int count = csvService.processStudentCsv(file).size();
            response.put("message", "Successfully processed " + count + " students.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Error processing CSV: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/faculties")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> uploadFaculties(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        try {
            int count = csvService.processFacultyCsv(file).size();
            response.put("message", "Successfully processed " + count + " faculties.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Error processing CSV: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
