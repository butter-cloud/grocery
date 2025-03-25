package com.grocery.app_server.repository;

import com.grocery.app_server.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserIdOrderByProductId(Long userId);
    void deleteByUserId(Long userId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

}
