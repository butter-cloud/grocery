package com.grocery.app_server.controller;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public ResponseEntity<?> login(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();

        log.info("[AuthController] Logging in user with username: {}", username);

        try {
            String token = userService.login(username, password);
            if (token != null) {
                ResponseCookie cookie = ResponseCookie.from("token", token)
                        .path("/")
                        .httpOnly(true)
                        .secure(false)  // Set to true in production
                        .maxAge(3600)  // 1 hour
                        .build();

                log.info("[AuthController] login - cookie string: {}", cookie.toString());

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body("User logged in successfully");
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (UsernameNotFoundException e) {
            log.error("User not found", e);
            return ResponseEntity.status(401).body("User not found");
        } catch (Exception e) {
            log.error("Error logging in user", e);
            return ResponseEntity.status(500).body("Error logging in user");
        }
    }

}
