package com.grocery.app_server.controller;

import com.grocery.app_server.common.WebResponse;
import com.grocery.app_server.entity.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/cart")
public class CartController {
    private static final Logger log = LoggerFactory.getLogger(CartController.class);

    @PostMapping("/add")
    public ResponseEntity<WebResponse<?>> addCartProduct(@RequestBody Product product){
        log.info("[CartController] addCartProduct - product.name : {} ", product.getName());
        return ResponseEntity.ok(WebResponse.success(null, "success"));
    }
}
