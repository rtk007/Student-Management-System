package com.examly.springapp.repository;

import com.examly.springapp.model.Notification;
import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Get all notifications for a user
    List<Notification> findByUser(User user);

    // Optionally filter by read/unread
    List<Notification> findByUserAndIsRead(User user, Boolean isRead);
}
