package com.grocery.app_server.controller;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.UserService;
import com.grocery.app_server.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.naming.Name;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
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
            String accessToken = userService.login(username, password);

            if (accessToken != null) {
                String refreshToken = jwtUtil.generateRefreshToken(username);

                ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", accessToken)
                        .path("/")
                        .httpOnly(true)
                        .secure(false)  // Set to true in production
                        .maxAge(3600)  // 1 hour
                        .build();

                ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                        .path("/")
                        .httpOnly(true)
                        .secure(false)
                        .maxAge(604800)
                        .build();

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                        .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
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

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestHeader(value = "Authorization", required = false) String refreshToken) {

        log.info("[AuthController] refresh - refreshToken check");
        log.info("[AuthController] refreshToken : {} ", refreshToken);

        try {
            String tokenString = refreshToken.split(" ")[1];
            log.info("[AuthController] tokenString : {} ", tokenString);
        } catch (Exception e) {
            log.error("Error splitting token", e);
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
        log.info("[AuthController] refresh - refreshToken check end");
        return ResponseEntity.status(200).body("Valid refresh token");
    }

}
