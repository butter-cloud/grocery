package com.grocery.app_server.service;

import com.grocery.app_server.dto.JoinRequest;
import com.grocery.app_server.dto.LoginRequest;
import com.grocery.app_server.entity.User;
import com.grocery.app_server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Check if the loginId is already in use
     * @param loginId
     * @return true if the loginId is already in use
     */
    public boolean checkLoginIdDuplicate(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    /**
     * Check if the nickname is already in use
     * @param nickname
     * @return true if the nickname is already in use
     */
    public boolean checkNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public void join(JoinRequest req) {
        userRepository.save(req.toEntity());
    }

    public User login(LoginRequest req) {
        Optional<User> optionalUser = userRepository.findByLoginId(req.getLoginId());
        log.info("[UserService] optionalUser : {}", optionalUser);

        if (optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();
        if (!user.getPassword().equals(req.getPassword())) {
            return null;
        }

        return user;
    }

    public User getLoginUserById (Long userId) {
        if (userId == null) {
            return null;
        }

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return null;
        }

        return optionalUser.get();
    }

    public User getLoginUserByLoginId(String loginId) {
        if (loginId == null) {
            return null;
        }

        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if (optionalUser.isEmpty()) {
            return null;
        }

        return optionalUser.get();
    }
}
