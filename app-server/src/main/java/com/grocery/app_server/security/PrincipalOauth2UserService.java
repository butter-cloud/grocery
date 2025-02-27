package com.grocery.app_server.security;

import com.grocery.app_server.common.UserRole;
import com.grocery.app_server.entity.User;
import com.grocery.app_server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("[PrincipalOauth2UserService] oAuth2User attributes: {}", oAuth2User.getAttributes());

        String provider = userRequest.getClientRegistration().getRegistrationId();          // google
        String providerId = oAuth2User.getAttribute("sub");
        String loginId = provider + "_" + providerId;                                       // google_1234567890

        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        User user;

        if(optionalUser.isEmpty()) {
            user = User.builder()
                    .loginId(loginId)
                    .nickname(oAuth2User.getAttribute("name"))
                    .provider(provider)
                    .providerId(providerId)
                    .role(UserRole.USER)
                    .build();
            userRepository.save(user);
        } else {
            user = optionalUser.get();
        }

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
}
