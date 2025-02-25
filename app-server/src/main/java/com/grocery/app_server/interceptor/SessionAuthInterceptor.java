package com.grocery.app_server.interceptor;

import com.grocery.app_server.entity.User;
import com.grocery.app_server.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Slf4j
@Component
public class SessionAuthInterceptor implements HandlerInterceptor {
    private final UserService userService;

    public SessionAuthInterceptor(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("[SessionAuthInterceptor] preHandle");
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return sendUnauthorizedResponse(response);
        }
        User user = userService.getLoginUserById(userId);
        if (user == null) {
            return sendUnauthorizedResponse(response);
        }
        request.setAttribute("loginUser", user);
        return true;
    }

    private boolean sendUnauthorizedResponse(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 상태 코드 설정
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Unauthorized\"}");
        response.getWriter().flush();
        return false; // 요청 진행 중단
    }

}
