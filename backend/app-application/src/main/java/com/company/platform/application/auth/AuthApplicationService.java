package com.company.platform.application.auth;

import com.company.platform.application.auth.command.LoginCommand;
import com.company.platform.application.auth.command.RegisterCommand;
import com.company.platform.domain.user.model.User;
import com.company.platform.domain.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.LocalDateTime;

@Service
public class AuthApplicationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthApplicationService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterCommand command) {
        Assert.hasText(command.getUsername(), "username required");
        Assert.hasText(command.getPassword(), "password required");

        if (userRepository.existsByUsername(command.getUsername())) {
            throw new IllegalArgumentException("username already exists");
        }

        User user = new User();
        user.setUsername(command.getUsername());
        user.setPassword(passwordEncoder.encode(command.getPassword()));
        user.setRole("ADMIN");
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
    }

    public User login(LoginCommand command) {
        User user = userRepository.findByUsername(command.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("user not found"));

        if (!passwordEncoder.matches(command.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("invalid password");
        }

        return user;
    }
}

