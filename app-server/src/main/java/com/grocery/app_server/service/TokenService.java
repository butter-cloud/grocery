package com.grocery.app_server.service;

import com.grocery.app_server.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TokenService {

    private static final Logger log = LoggerFactory.getLogger(TokenService.class);

    private final UserService userService;
    private final JwtUtil jwtUtil;


    public TokenService (UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    public Map<String, String> createTokens (String username, String role) {
        if (username.isEmpty() || role.isEmpty()) {
            throw new IllegalArgumentException("Username and role are required");
        }

        String accessToken = jwtUtil.generateAccessToken(username, role);
        String refreshToken = jwtUtil.generateRefreshToken(username);

        Map<String, String> tokens = new HashMap<>();

        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);

        return tokens;
    }

    public Map<String, String> refreshTokens (String refreshToken) {

        String username = "";

        // 1. extract username from refresh token
        try {
            username = jwtUtil.extractUsername(refreshToken);
        } catch (Exception e) {
            throw new IllegalArgumentException("Extracting username from refresh token failed");
        }

        // 2. refresh token validation
        try {
            if (!username.isEmpty()){
                boolean isRefreshTokenValid = jwtUtil.validateToken(refreshToken, username);

                if (!isRefreshTokenValid) {
                    throw new IllegalArgumentException("Invalid refresh token");
                }
            }
        } catch (Exception e) { // validation failed
            throw new IllegalArgumentException("Refresh token validation failed");
        }

        // 3. create tokens
        String role = userService.getRole(username);
        try {
            return createTokens(username, role);
        } catch (Exception e) {
            log.error("[TokenService] refreshTokens - Error creating tokens", e);
            throw new IllegalArgumentException("Creating tokens failed");
        }
    }

    public String refreshTokenCookieString (String refreshToken) {

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .path("/")
                .httpOnly(true)
                .secure(false)
                .maxAge(604800)
                .build();

        return refreshTokenCookie.toString();
    }

}
