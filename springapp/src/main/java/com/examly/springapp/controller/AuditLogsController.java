// controller/AuditLogsController.java
package com.examly.springapp.controller;

import com.examly.springapp.model.AuditLogs;
import com.examly.springapp.service.AuditLogsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuditLogsController {

    private final AuditLogsService auditLogsService;

    @GetMapping
    public Page<AuditLogs> getAllLogs(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size) {
        return auditLogsService.getAllLogs(PageRequest.of(page, size));
    }

    @GetMapping("/user/{userId}")
    public Page<AuditLogs> getLogsByUser(@PathVariable Long userId,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size) {
        return auditLogsService.getLogsByUser(userId, PageRequest.of(page, size));
    }

    @GetMapping("/{entityType}/{entityId}")
    public Page<AuditLogs> getLogsForEntity(@PathVariable String entityType,
                                            @PathVariable Long entityId,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        return auditLogsService.getLogsForEntity(entityType, entityId, PageRequest.of(page, size));
    }
}
