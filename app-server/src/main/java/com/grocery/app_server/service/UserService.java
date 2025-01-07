package com.grocery.app_server.service;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.Map;

@Service
public class UserService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void registerUser(String username, String password, String role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))  // 역할을 권한으로 변환
        );
    }

    public Map<String, String> loginUser(String username, String password, TokenService tokenService) {

        // DB 유저 정보 조회
        try {
            UserDetails userFromDB = loadUserByUsername(username);

            // userFromDB empty check
            if (userFromDB != null) {

                // check password
                if (userFromDB.getPassword().equals(password)) {
                    String role = userFromDB.getAuthorities().iterator().next().getAuthority();
                    return tokenService.createTokens(username, role);
                }
            }
            log.error("[UserService] login - User not found with username: {}", username);
            return null;

        } catch (UsernameNotFoundException e) {
            log.error("[UserService] login - UsernameNotFoundException : {}", e.getMessage());
            return null;
        }
    }

    public String getRole(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return user.getRole();
    }
}
