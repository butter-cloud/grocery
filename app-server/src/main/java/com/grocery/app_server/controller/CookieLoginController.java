package com.grocery.app_server.controller;

import com.grocery.app_server.common.WebResponse;
import com.grocery.app_server.dto.JoinRequest;
import com.grocery.app_server.dto.LoginRequest;
import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/cookie")
public class CookieLoginController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<WebResponse<?>> join(@RequestBody JoinRequest joinRequest) {
        log.info("[CookieLoginController] join - loginId : {} ", joinRequest.getLoginId());
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
    public ResponseEntity<WebResponse<?>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        log.info("[CookieLoginController] login - loginId : {} ", loginRequest.getLoginId());
        User user = userService.login(loginRequest);
        if (user == null) {
            return ResponseEntity.badRequest().body(WebResponse.failure("Login failed"));
        } else {
            Cookie cookie = new Cookie("userId", user.getId().toString());
            cookie.setMaxAge(60 * 60); // 1 hour
            cookie.setPath("/");
            cookie.setSecure(false);
            response.addCookie(cookie);
            return ResponseEntity.ok(WebResponse.success(user, "success"));
        }
    }

    @GetMapping("/home")
    public String home() {
        return "cookie auth home!";
    }

    @GetMapping("/logout")
    public ResponseEntity<WebResponse<?>> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("userId", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok(WebResponse.success(null, "success"));
    }
}
