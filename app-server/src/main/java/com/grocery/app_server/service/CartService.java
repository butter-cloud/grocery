package com.grocery.app_server.service;

import com.grocery.app_server.dto.CartRequestDto;
import com.grocery.app_server.entity.CartItem;
import com.grocery.app_server.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;

    public List<CartItem> getCartItems(Long userId) {
        log.info("[CartService] getCartItems - userId: {}", userId);
        return cartItemRepository.findByUserIdOrderByProductId(userId);
    }

    public void increaseCartItem(Long userId, Long productId, int quantity) {
        log.info("[CartService] increaseCartItem - userId: {}, productId: {}, quantity: {}", userId, productId, quantity);
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElse(null);

        if (cartItem == null) {
            cartItem = new CartItem(userId, productId, quantity);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        cartItemRepository.save(cartItem);
    }

    public void decreaseCartItem(Long userId, Long productId, int quantity) {
        log.info("[CartService] decreaseCartItem - userId: {}, productId: {}, quantity: {}", userId, productId, quantity);
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElse(null);

        if (cartItem == null) {
            throw new RuntimeException("Item not found in cart");
        } else {
            cartItem.setQuantity(cartItem.getQuantity() - quantity);
            if (cartItem.getQuantity() <= 0) {
                cartItemRepository.deleteByUserIdAndProductId(userId, productId);
            } else {
                cartItemRepository.save(cartItem);
            }
        }
    }

    @Transactional
    public void deleteCartItem(Long userId, Long productId) {
        log.info("[CartService] deleteCartItem - userId: {}, productId: {}", userId, productId);
        cartItemRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional
    public void mergeCartItems(Long userId, List<CartRequestDto> cartRequestDtoList) {
        // cartRequestDtoList 를 CartItem 리스트로 변환
        List<CartItem> localCartItems = cartRequestDtoList.stream()
                .map(request -> new CartItem(userId, request.getProductId(), request.getQuantity()))
                .toList();

        List<CartItem> dbCartItems = cartItemRepository.findByUserIdOrderByProductId(userId);

        // DB에 저장할 mergedMap 생성
        Map<Long, CartItem> mergedMap = new HashMap<>();

        // 기존 DB 항목 먼저 넣기
        for (CartItem dbItem : dbCartItems) {
            mergedMap.put(dbItem.getProductId(), dbItem);
        }

        // 로컬 항목 병합
        for (CartItem localItem : localCartItems) {
            CartItem existing = mergedMap.get(localItem.getProductId());
            if (existing != null) {
                existing.setQuantity(existing.getQuantity() + localItem.getQuantity());
            } else {
                mergedMap.put(localItem.getProductId(), localItem);
            }
        }

        // 변경된 모든 항목 한 번에 저장
        cartItemRepository.saveAll(mergedMap.values());
    }
}
