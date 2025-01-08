package com.grocery.app_server.controller;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.TokenService;
import com.grocery.app_server.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
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
    private final TokenService tokenService;

    public AuthController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
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
        }
        catch (Exception e) {
            log.error("[AuthController] Register - Error registering user", e);
            return ResponseEntity.badRequest().body("Error registering user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();

        log.info("[AuthController] Logging in user with username: {}", username);

        try {
            Map<String, String> tokens = userService.loginUser(username, password, tokenService);
            if (tokens != null) {
                Map<String, String> response = new HashMap<>();
                response.put("accessToken", tokens.get("accessToken"));

                log.info("[AuthController] accessToken : {}", tokens.get("accessToken"));
                log.info("[AuthController] refreshTokens : {}", tokens.get("refreshToken"));

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, tokenService.refreshTokenCookieString(tokens.get("refreshToken")))
                        .body(response);
            } else {
                return ResponseEntity.status(401).body("Invalid username or password");
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
                Map<String, String> tokens = tokenService.refreshTokens(refreshToken);

                if (tokens != null) {
                    String newAccessToken = tokens.get("accessToken");
                    String newRefreshToken = tokens.get("refreshToken");

                    Map<String, String> response = new HashMap<>();
                    response.put("accessToken", newAccessToken);

                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, newRefreshToken)
                            .body(response);
                } else {
                    // tokenService refreshTokens failed
                    log.error("[AuthController] refresh - tokenService refreshTokens returned null");
                    return ResponseEntity.status(401).body(null);
                }

            } catch (Exception e) {
                log.error("[AuthController] refresh - Error validating refresh token", e);
                return ResponseEntity.status(401).body(null);
            }
        }

        log.error("[AuthController] refresh - request refreshToken is null");
        return ResponseEntity.status(401).body(null);
    }

}
