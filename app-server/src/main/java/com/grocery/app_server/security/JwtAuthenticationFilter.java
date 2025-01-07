package com.grocery.app_server.security;

import com.grocery.app_server.util.JwtUtil;
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

        // header에서 accessToken 추출
        String accessToken = resolveAccessToken(request);
        log.info("[JwtAuthenticationFilter] accessToken : {} ", accessToken);

        // accessToken 이 존재하고 유효하다면 인증 설정
        if (accessToken != null && jwtUtil.validateToken(accessToken, jwtUtil.extractUsername(accessToken))) {
            String username = jwtUtil.extractUsername(accessToken);

            // 사용자 인증 정보를 SecurityContext에 설정
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, null);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            log.info("[JwtAuthenticationFilter] No valid access token found. Access denied");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Access denied");
            return;
        }
        // 인증 됐다면 필터 체인 계속 진행
        filterChain.doFilter(request, response);
    }

    private String resolveAccessToken(HttpServletRequest request) {
        log.info("[JwtAuthenticationFilter] Resolving access token from request header");

        String authHeaderString = request.getHeader("Authorization");
        log.info("[JwtAuthenticationFilter] Authorization header : {}", authHeaderString);

        if (authHeaderString != null && authHeaderString.startsWith("Bearer ")) {
            return authHeaderString.substring(7);
        }

        return null;
    }
}
