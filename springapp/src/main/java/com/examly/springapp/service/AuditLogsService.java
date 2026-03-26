// service/AuditLogsService.java
package com.examly.springapp.service;

import com.examly.springapp.model.AuditLogs;
import com.examly.springapp.repository.AuditLogsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class AuditLogsService {

    private final AuditLogsRepository auditLogsRepository;

    public Page<AuditLogs> getAllLogs(Pageable pageable) {
        return auditLogsRepository.findAll(pageable);
    }

    public Page<AuditLogs> getLogsByUser(Long userId, Pageable pageable) {
        return auditLogsRepository.findByUserId(userId, pageable);
    }

    public Page<AuditLogs> getLogsForEntity(String entityType, Long entityId, Pageable pageable) {
        return auditLogsRepository.findByEntityTypeAndEntityId(entityType, entityId, pageable);
    }
}
