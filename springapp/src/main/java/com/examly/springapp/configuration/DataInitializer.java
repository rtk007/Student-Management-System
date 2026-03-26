package com.examly.springapp.configuration;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.sql.Timestamp;

@Component
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        // Ensure admin user always exists with requested credentials.
        User admin = userRepository.findByUsername("Admin").orElseGet(User::new);
        boolean isNewAdmin = admin.getId() == null;

        if (isNewAdmin) {
            admin.setUsername("Admin");
            admin.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        }

        admin.setEmail("admin@examly.com");
        admin.setPasswordHash(passwordEncoder.encode("123456"));
        admin.setRole(User.Role.ADMIN);
        admin.setInstitutionId(1);
        admin.setIsActive(true);
        admin.setEmailVerified(true);

        userRepository.save(admin);

        if (isNewAdmin) {
            System.out.println("Admin user created: username=Admin, password=123456");
        } else {
            System.out.println("Admin user updated/reset: username=Admin, password=123456");
        }
    }
}
