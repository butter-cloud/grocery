package com.grocery.app_server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    @RequestMapping("/hello")
    public String hello() {
        return "Test data string";
    }

    @RequestMapping("/test")
    public String test() {
        return "webhook test!!!!!";
    }
}
