// repository/AuditLogsRepository.java
package com.examly.springapp.repository;

import com.examly.springapp.model.AuditLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface AuditLogsRepository extends JpaRepository<AuditLogs, Long> {
    Page<AuditLogs> findByUserId(Long userId, Pageable pageable);
    Page<AuditLogs> findByEntityTypeAndEntityId(String entityType, Long entityId, Pageable pageable);
}
