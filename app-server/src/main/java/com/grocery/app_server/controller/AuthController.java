package com.grocery.app_server.controller;

import com.grocery.app_server.dto.AuthRequest;
import com.grocery.app_server.dto.AuthResponse;
import com.grocery.app_server.dto.RefreshRequest;
import com.grocery.app_server.entity.RefreshToken;
import com.grocery.app_server.entity.User;
import com.grocery.app_server.repository.RefreshTokenRepository;
import com.grocery.app_server.repository.UserRepository;
import com.grocery.app_server.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @Transactional
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(new AuthResponse(null, null, "Invalid password"));
        }

        String accessToken = jwtUtil.generateAccessToken(user.getUsername());
        RefreshToken refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

        refreshTokenRepository.deleteByUsername(user.getUsername());
        refreshTokenRepository.save(refreshToken);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken.getToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(new AuthResponse(accessToken, null, null));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@CookieValue("refreshToken") String refreshToken) {
        RefreshToken refreshTokenFromDB = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (refreshTokenFromDB.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshTokenFromDB);
            return ResponseEntity.badRequest().body(new AuthResponse(null, null, "Refresh token expired"));
        }

        String newAccessToken = jwtUtil.generateAccessToken(refreshTokenFromDB.getUsername());
        return ResponseEntity.ok(new AuthResponse(newAccessToken, null, null));
    }

    @Transactional
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue("refreshToken") String refreshToken) {
        log.info("[AuthController] Logout request");

        RefreshToken refreshTokenFromDB = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (refreshTokenFromDB.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshTokenFromDB);
            return ResponseEntity.badRequest().body("Refresh token expired");
        }

        refreshTokenRepository.deleteByUsername(refreshTokenFromDB.getUsername());
        return ResponseEntity.ok("Logged out successfully");
    }
}
