package com.grocery.app_server.controller;

import com.grocery.app_server.entity.Product;
import com.grocery.app_server.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/product")
public class ProductController {

    private static final Logger log = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public Iterable<Product> getAllProducts() {
        log.info("Getting all products");
        return productService.getAllProducts();
    }

    @PostMapping("/new")
    public Product addNewProduct(@RequestBody Product product) {
        log.info("Adding product name: {}", product.getName());
        log.info("Adding product price: {}", product.getPrice());
        return productService.addProduct(product);
    }

    @GetMapping("/{id}")
    public Product getProductDetails(@PathVariable Long id) {
        log.info("Getting product details for id: {}", id);
        return productService.getProductDetails(id);
    }
}