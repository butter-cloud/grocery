package com.grocery.app_server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @RequestMapping("/api/hello")
    public String hello() {
        return "Hello World";
    }
}
