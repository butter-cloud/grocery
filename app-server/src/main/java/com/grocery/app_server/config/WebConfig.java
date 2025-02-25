package com.grocery.app_server.config;

import com.grocery.app_server.interceptor.CookieAuthInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final CookieAuthInterceptor cookieAuthInterceptor;

    public WebConfig(CookieAuthInterceptor cookieAuthInterceptor) {
        this.cookieAuthInterceptor = cookieAuthInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(cookieAuthInterceptor)
                .addPathPatterns("/cookie/**")
                .excludePathPatterns("/cookie/join", "/cookie/login", "/cookie/logout");
    }
}
