package com.examly.springapp.controller;

import com.examly.springapp.model.Notification;
import com.examly.springapp.model.User;
import com.examly.springapp.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification create(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    @GetMapping
    public List<Notification> getAll() {
        return notificationService.getAllNotifications();
    }

    // Get notifications for a specific user
    @GetMapping("/user/{userId}")
    public List<Notification> getByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        return notificationService.getNotificationsForUser(user);
    }

    @PutMapping("/{id}")
    public Notification update(@PathVariable Long id, @RequestBody Notification notification) {
        return notificationService.updateNotification(id, notification);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.deleteNotification(id);
    }
}
