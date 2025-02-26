package com.grocery.app_server.service;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.repository.UserRepository;
import com.grocery.app_server.security.PrincipalDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * PrincipalDetailsService
 * spring security에서 사용자 인증을 위해 사용되는 클래스
 */
@Slf4j
@Service
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public PrincipalDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {

        log.info("[PrincipalDetailsService] loadUserByUsername : {}", loginId);

        if (loginId == null || loginId.trim().isEmpty()) {
            throw new UsernameNotFoundException("로그인 ID가 비어 있습니다.");
        }

        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다. : " + loginId);
        }

        User user = optionalUser.get();

        log.info("[PrincipalDetailsService] user : {}", user);

        return new PrincipalDetails(user);
    }
}
