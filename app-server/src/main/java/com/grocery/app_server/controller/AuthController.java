package com.grocery.app_server.controller;

import com.grocery.app_server.dto.AuthRequest;
import com.grocery.app_server.dto.AuthResponse;
import com.grocery.app_server.dto.RefreshRequest;
import com.grocery.app_server.entity.RefreshToken;
import com.grocery.app_server.entity.User;
import com.grocery.app_server.repository.RefreshTokenRepository;
import com.grocery.app_server.repository.UserRepository;
import com.grocery.app_server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

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

        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken.getToken(), null));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            return ResponseEntity.badRequest().body(new AuthResponse(null, null, "Refresh token expired"));
        }

        String newAccessToken = jwtUtil.generateAccessToken(refreshToken.getUsername());
        return ResponseEntity.ok(new AuthResponse(newAccessToken, null, null));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody RefreshRequest request) {
        refreshTokenRepository.deleteByUsername(jwtUtil.getUsernameFromToken(request.getRefreshToken()));
        return ResponseEntity.ok("Logged out successfully");
    }
}
