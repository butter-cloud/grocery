package com.grocery.app_server.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    private static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 256비트 이상의 키를 자동으로 생성

    public String generateAccessToken(String username, String role) {

        log.info("[JwtUtil] Generating token for username {}", username);

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour validity
                .signWith(secretKey)
                .compact();
    }

    public String generateRefreshToken(String username) {

        log.info("[JwtUtil] Generating refresh token for '{}'", username);

        return Jwts.builder()
                .setSubject(username)
                .claim("tokenType", "refresh")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 7 days validity
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token, String username) {

        log.info("[JwtUtil] Validating token for '{}'", username);

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject().equals(username) && !isTokenExpired(claims);
        } catch (SignatureException e) {
            log.info("[JwtUtil] Invalid token signature");
            return false;
        }
    }

    private boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    public String extractUsername(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public String extractRole(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
        return (String) claims.get("role");
    }
}