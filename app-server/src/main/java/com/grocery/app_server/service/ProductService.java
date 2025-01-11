package com.grocery.app_server.service;

import com.grocery.app_server.entity.Product;
import com.grocery.app_server.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductDetails(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}