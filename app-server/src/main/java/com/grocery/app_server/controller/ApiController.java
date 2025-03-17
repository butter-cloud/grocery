package com.grocery.app_server.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
public class ApiController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @RequestMapping("/hello")
    public String hello() {
        log.info("googleClientId : {}", googleClientId);
        log.info("googleClientSecret : {}", googleClientSecret);
        return "Test data string";
    }

    @RequestMapping("/test")
    public String test() {
        return "finally!";
    }
}
