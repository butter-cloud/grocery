package com.grocery.app_server.interceptor;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Slf4j
@Component
public class CookieAuthInterceptor implements HandlerInterceptor {
    private final UserService userService;

    public CookieAuthInterceptor(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("[CookieAuthInterceptor] preHandle");
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return sendUnauthorizedResponse(response);
        }

        for (Cookie cookie : cookies) {
            if ("userId".equals(cookie.getName())) {
                Long userId = Long.valueOf(cookie.getValue());
                log.info("[CookieAuthInterceptor] userId : {}", userId);
                User user = userService.getLoginUserById(userId);
                if (user == null) {
                    return sendUnauthorizedResponse(response);
                }
                request.setAttribute("loginUser", user);
                return true;
            }
        }
        return sendUnauthorizedResponse(response);
    }

    private boolean sendUnauthorizedResponse(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 상태 코드 설정
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Unauthorized\"}");
        response.getWriter().flush();
        return false; // 요청 진행 중단
    }
}
