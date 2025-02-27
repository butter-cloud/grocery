package com.grocery.app_server.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ApiController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @RequestMapping("/hello")
    public String hello() {
        log.info("googleClientId : {}", googleClientId);
        return "Test data string";
    }

    @RequestMapping("/test")
    public String test() {
        return "finally!";
    }
}
