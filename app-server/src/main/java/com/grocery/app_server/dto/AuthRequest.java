package com.grocery.app_server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    private String username;
    private String password;
}
