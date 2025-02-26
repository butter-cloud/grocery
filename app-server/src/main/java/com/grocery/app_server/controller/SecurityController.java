package com.grocery.app_server.controller;

import com.grocery.app_server.common.WebResponse;
import com.grocery.app_server.dto.JoinRequest;
import com.grocery.app_server.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/security")
public class SecurityController {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/join")
    public ResponseEntity<WebResponse<?>> join(@RequestBody JoinRequest joinRequest) {
        log.info("[SecurityController] join - loginId : {} ", joinRequest.getLoginId());

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

        String encodedPassword = bCryptPasswordEncoder.encode(joinRequest.getPassword());
        joinRequest.setPassword(encodedPassword);
        userService.join(joinRequest);

        return ResponseEntity.ok(WebResponse.success(null, "success"));
    }

    @GetMapping("/check-login")
    public ResponseEntity<WebResponse<?>> checkLoginStatus(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("SPRING_SECURITY_CONTEXT") == null) {
            return ResponseEntity.ok(WebResponse.success(Collections.singletonMap("loggedIn", false), null));
        }
        return ResponseEntity.ok(WebResponse.success(Collections.singletonMap("loggedIn", true), null));
    }

    @GetMapping("/home")
    public String home() {
        log.info("[SecurityController] home");
        return "security home!";
    }

    @GetMapping("/admin")
    public String admin() {
        log.info("[SecurityController] admin");
        return "admin home!";
    }
}
