package com.grocery.app_server.controller;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.UserService;
import com.grocery.app_server.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

                ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                        .path("/")
                        .httpOnly(true)
                        .secure(false)
                        .maxAge(604800)
                        .build();

                Map<String, String> response = new HashMap<>();
                response.put("accessToken", accessToken);

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                        .body(response);
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

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
        log.info("[AuthController] refresh - refreshToken : {}", refreshToken);

        if (refreshToken != null) {
            try {
                // refresh token 유효성 검증
                boolean isTokenValid = jwtUtil.validateToken(refreshToken, jwtUtil.extractUsername(refreshToken));

                if (isTokenValid) {
                    String username = jwtUtil.extractUsername(refreshToken);
                    String newAccessToken = jwtUtil.generateAccessToken(username, userService.getRole(username));
                    String newRefreshToken = jwtUtil.generateRefreshToken(username);

                    log.info("[AuthController] refresh - newAccessToken : {}", newAccessToken);

                    Map<String, String> response = new HashMap<>();
                    response.put("accessToken", newAccessToken);

                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, ResponseCookie.from("refreshToken", refreshToken)
                                    .path("/")
                                    .httpOnly(true)
                                    .secure(false)
                                    .maxAge(604800)
                                    .build().toString())
                            .body(response);
                }
            } catch (Exception e) {
                log.error("Error validating refresh token", e);
                return ResponseEntity.status(401).body(null);
            }
        }

        return ResponseEntity.status(401).body(null);
    }

}
