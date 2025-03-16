package com.grocery.app_server.util;

import com.grocery.app_server.entity.RefreshToken;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {

    private static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 256비트 이상의 키를 자동으로 생성
    private final long accessTokenValidity = 1000 * 60 * 15; // 15 minutes
    private final long refreshTokenValidity = 1000 * 60 * 60 * 24 * 7; // 7 days

    private Key getSigningKey() {
        return secretKey;
    }

    public String generateAccessToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenValidity))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public RefreshToken generateRefreshToken(String username) {
        String token = UUID.randomUUID().toString();
        return new RefreshToken(null, token, username, Instant.now().plusMillis(refreshTokenValidity));
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody().getSubject();
    }
}
