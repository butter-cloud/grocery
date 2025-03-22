package com.grocery.app_server.service;

import com.grocery.app_server.entity.RefreshToken;
import com.grocery.app_server.entity.User;
import com.grocery.app_server.repository.RefreshTokenRepository;
import com.grocery.app_server.repository.UserRepository;
import com.grocery.app_server.security.PrincipalDetails;
import com.grocery.app_server.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtil jwtUtil;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("[PrincipalOAuth2UserService] OAuth2User attributes: {}", oAuth2User.getAttributes());

        String provider = userRequest.getClientRegistration().getRegistrationId();           // google
        String providerId = oAuth2User.getAttribute("sub");
        String username = provider + "_" + providerId;                                       // google_1234567890

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        User user = userRepository.findByUsername(username).orElse(null);
        log.info("[PrincipalOAuth2UserService] User from DB: {}", user);

        if (user == null) {
            log.info("[PrincipalOAuth2UserService] User not found, creating new user");
            user = userRepository.save(
                User.builder()
                    .username(username)
                    .password(bCryptPasswordEncoder.encode("OAUTH2_USER"))
                    .provider(provider)
                    .providerId(providerId)
                    .build()
            );
        }

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
}
