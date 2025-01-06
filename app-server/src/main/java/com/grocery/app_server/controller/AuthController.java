package com.grocery.app_server.controller;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        String role = user.getRole();

        log.info("[AuthController] Registering user with username: {}", username);

        if (username.isEmpty()|| password.isEmpty() || role.isEmpty()) {
            return ResponseEntity.badRequest().body("Username, password, and role are required");
        }

        try {
            userService.registerUser(username, password, role);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            log.error("Error registering user", e);
            return ResponseEntity.badRequest().body("Error registering user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("User logged in");
    }

}
