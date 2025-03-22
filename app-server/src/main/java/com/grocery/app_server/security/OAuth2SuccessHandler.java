package com.grocery.app_server.security;

import com.grocery.app_server.entity.RefreshToken;
import com.grocery.app_server.repository.RefreshTokenRepository;
import com.grocery.app_server.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("[OAuth2SuccessHandler] onAuthenticationSuccess working!");
        String username = authentication.getName();

        RefreshToken refreshToken = jwtUtil.generateRefreshToken(username);

        refreshTokenRepository.deleteByUsername(username);
        refreshTokenRepository.save(refreshToken);

        log.info("[OAuth2SuccessHandler] RefreshToken: {}", refreshToken);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken.getToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        response.addCookie(refreshTokenCookie);

        response.setStatus(HttpServletResponse.SC_OK);

        response.sendRedirect("http://localhost:3000/loading?redirectedFromSocialLogin=true");
    }
}
