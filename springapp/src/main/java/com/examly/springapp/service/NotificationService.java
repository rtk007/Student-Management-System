package com.examly.springapp.service;

import com.examly.springapp.model.Notification;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> getNotificationsForUser(User user) {
        return notificationRepository.findByUser(user);
    }

    public Notification updateNotification(Long id, Notification updated) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setMessage(updated.getMessage());
        notification.setType(updated.getType());
        notification.setPriority(updated.getPriority());
        notification.setCategory(updated.getCategory());
        notification.setIsRead(updated.getIsRead());
        return notificationRepository.save(notification);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}
