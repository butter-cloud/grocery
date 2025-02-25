package com.grocery.app_server.config;

import com.grocery.app_server.interceptor.CookieAuthInterceptor;
import com.grocery.app_server.interceptor.SessionAuthInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final CookieAuthInterceptor cookieAuthInterceptor;
    private final SessionAuthInterceptor sessionAuthInterceptor;

    public WebConfig(CookieAuthInterceptor cookieAuthInterceptor, SessionAuthInterceptor sessionAuthInterceptor) {
        this.cookieAuthInterceptor = cookieAuthInterceptor;
        this.sessionAuthInterceptor = sessionAuthInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(cookieAuthInterceptor)
                .addPathPatterns("/cookie/**")
                .excludePathPatterns("/cookie/join", "/cookie/login", "/cookie/logout");

        registry.addInterceptor(sessionAuthInterceptor)
                .addPathPatterns("/session/**")
                .excludePathPatterns("/session/join", "/session/login", "/session/logout");
    }
}
