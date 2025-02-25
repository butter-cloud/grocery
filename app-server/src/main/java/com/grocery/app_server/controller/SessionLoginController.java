package com.grocery.app_server.controller;

import com.grocery.app_server.common.WebResponse;
import com.grocery.app_server.dto.JoinRequest;
import com.grocery.app_server.dto.LoginRequest;
import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/session")
public class SessionLoginController {
    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<WebResponse<?>> join(@RequestBody JoinRequest joinRequest) {
        log.info("[SessionLoginController] join - loginId : {} ", joinRequest.getLoginId());
        // loginId duplication check
        if (userService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            return ResponseEntity.badRequest().body(WebResponse.failure("The loginId is already in use"));
        }
        // nickname duplication check
        if (userService.checkNicknameDuplicate(joinRequest.getNickname())) {
            return ResponseEntity.badRequest().body(WebResponse.failure("The nickname is already in use"));
        }
        // password and passwordCheck match check
        if (!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            return ResponseEntity.badRequest().body(WebResponse.failure("The password and passwordCheck do not match"));
        }
        userService.join(joinRequest);
        return ResponseEntity.ok(WebResponse.success(null, "success"));
    }

    @PostMapping("/login")
    public ResponseEntity<WebResponse<?>> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        log.info("[SessionLoginController] login - loginId : {} ", loginRequest.getLoginId());
        User user = userService.login(loginRequest);
        if (user == null) {
            return ResponseEntity.badRequest().body(WebResponse.failure("Login failed"));
        }
        request.getSession().invalidate();
        HttpSession session = request.getSession(true);
        session.setAttribute("userId", user.getId());
        session.setMaxInactiveInterval(30 * 60); // 30 minutes
        return ResponseEntity.ok(WebResponse.success(user, "success"));
    }

    @GetMapping("/home")
    public String home(@SessionAttribute("userId") Long userId) {
        if (userId == null) {
            return "login required";
        }
        User loginUser = userService.getLoginUserById(userId);
        if (loginUser == null) {
            return "login required";
        }
        log.info("[SessionLoginController] loginUser : {}", loginUser);

        return "hello " + loginUser.getNickname() + ", this is session auth home!";
    }

    @GetMapping("/logout")
    public ResponseEntity<WebResponse<?>> logout(HttpServletRequest request) {
        log.info("[SessionLoginController] logout");
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok(WebResponse.success(null, "success"));
    }
}
