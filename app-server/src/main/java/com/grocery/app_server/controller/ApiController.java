package com.grocery.app_server.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ApiController {

    @RequestMapping("/hello")
    public String hello() {
        return "Test data string";
    }

    @RequestMapping("/test")
    public String test() {
        return "finally!";
    }
}
