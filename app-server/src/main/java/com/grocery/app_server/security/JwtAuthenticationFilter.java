package com.grocery.app_server.security;

import com.grocery.app_server.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        log.info("[JwtAuthenticationFilter] Processing authentication for '{}'", requestURI);

        // cookie에서 accessToken 추출
        String accessToken = resolveAccessToken(request);
        log.info("[JwtAuthenticationFilter] accessToken : {} ", accessToken);

        // accessToken 이 존재하고 유효하다면 인증 설정
        if (accessToken != null && jwtUtil.validateToken(accessToken, jwtUtil.extractUsername(accessToken))) {
            String username = jwtUtil.extractUsername(accessToken);

            // 사용자 인증 정보를 SecurityContext에 설정
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, null);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            // accessToken not valid, check for refreshToken
            log.info("[JwtAuthenticationFilter] No valid access token found. Checking Refresh Token");

            String refreshToken = resolveRefreshToken(request);
            log.info("[JwtAuthenticationFilter] refreshToken : {} ", refreshToken);

            // refeshToken 이 존재하고 유효하다면 새로운 accessToken 발급
            if (refreshToken != null) {

                try {
                    jwtUtil.validateToken(refreshToken, jwtUtil.extractUsername(refreshToken));
                } catch (Exception e) {
                    log.info("[JwtAuthenticationFilter] Refresh Token is invalid");
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.getWriter().write("Access denied");
                    return;
                }

                log.info("[JwtAuthenticationFilter] Refresh Token is valid");
                String username = jwtUtil.extractUsername(refreshToken);

                // 사용자 인증 정보를 SecurityContext에 설정
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, null);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // 새로운 access token 발급
                String newAccessToken = jwtUtil.generateAccessToken(username, jwtUtil.extractRole(refreshToken));
                log.info("[JwtAuthenticationFilter] New access token generated '{}'", newAccessToken);

                // 쿠키에 새로운 access token 설정
                Cookie cookie = new Cookie("accessToken", newAccessToken);
                cookie.setHttpOnly(true);
                cookie.setMaxAge(3600);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
            else {
                log.info("[JwtAuthenticationFilter] No valid refresh token found. Access denied");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Access denied");
                return;
            }
        }
        // 필터 체인 계속 진행
        filterChain.doFilter(request, response);
    }

    private String resolveAccessToken(HttpServletRequest request) {
        log.info("[JwtAuthenticationFilter] Resolving access token from request");

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    log.info("[JwtAuthenticationFilter] Access Token fount in cookie '{}'", cookie.getValue());
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private String resolveRefreshToken(HttpServletRequest request) {
        log.info("[JwtAuthenticationFilter] Resolving refresh token from request");

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    log.info("[JwtAuthenticationFilter] Refresh Token found in cookie '{}'", cookie.getValue());
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
