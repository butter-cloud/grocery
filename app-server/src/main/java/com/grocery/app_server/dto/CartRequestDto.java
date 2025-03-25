package com.grocery.app_server.dto;

import lombok.Getter;

@Getter
public class CartRequestDto {
    private Long productId;
    private int quantity;
}
