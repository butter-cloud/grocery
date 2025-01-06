package com.grocery.app_server.service;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.repository.UserRepository;
import com.grocery.app_server.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;

@Service
public class UserService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public UserService(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
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

    public String login(String username, String password) {
        UserDetails userDetails = loadUserByUsername(username);

        log.info("[UserService] login - userDetails.getAuthorities : {}", userDetails.getAuthorities().toString());
        log.info("[UserService] login - userDetails.getUsername : {}", userDetails.getUsername());
        log.info("[UserService] login - userDetails.getPassword : {}", userDetails.getPassword());

        if (userDetails.getPassword().equals(password)) {
            return jwtUtil.generateAccessToken(userDetails.getUsername(), userDetails.getAuthorities().toString());
        } else {
            return null;
        }
    }
}
