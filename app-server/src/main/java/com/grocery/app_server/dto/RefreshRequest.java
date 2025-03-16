package com.grocery.app_server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshRequest {
    private String refreshToken;
}
