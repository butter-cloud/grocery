package com.grocery.app_server.controller;

import com.grocery.app_server.common.WebResponse;
import com.grocery.app_server.dto.CartRequestDto;
import com.grocery.app_server.security.PrincipalDetails;
import com.grocery.app_server.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    /**
     * Get cart items
     * @param principalDetails
     */
    @GetMapping("/items")
    public ResponseEntity<WebResponse<?>> getCartItems(
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ) {
        Long userId = principalDetails.getUserId();
        log.info("[CartController] getCartItems request from userId {}", userId);

        try {
            return ResponseEntity.ok(WebResponse.success(cartService.getCartItems(userId), "Cart items retrieved"));
        } catch (Exception e) {
            log.error("[CartController] getCartItems error", e);
            return ResponseEntity.badRequest().body(WebResponse.failure(e.getMessage()));
        }
    }

    /**
     * Add item to cart
     * @param principalDetails
     * @param cartItem
     * @return
     */
    @PostMapping("/increase")
    public ResponseEntity<WebResponse<?>> increaseCartItem(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestBody CartRequestDto cartItem
    ) {
        Long userId = principalDetails.getUserId();
        log.info("[CartController] increaseCartItem request from userId {}", userId);

        Long productId = cartItem.getProductId();
        int quantity = cartItem.getQuantity();

        try {
            cartService.increaseCartItem(userId, productId, quantity);
            return ResponseEntity.ok(WebResponse.success(null, "Item added to cart"));
        } catch (Exception e) {
            log.error("[CartController] increaseCartItem error", e);
            return ResponseEntity.badRequest().body(WebResponse.failure(e.getMessage()));
        }
    }

    /**
     * Decrease item quantity from cart
     * @param principalDetails
     * @param cartItem
     * @return
     */
    @PostMapping("/decrease")
    public ResponseEntity<WebResponse<?>> decreaseCartItem(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestBody CartRequestDto cartItem
    ) {
        Long userId = principalDetails.getUserId();
        log.info("[CartController] decreaseCartItem request from userId {}", userId);

        Long productId = cartItem.getProductId();
        int quantity = cartItem.getQuantity();

        try {
            cartService.decreaseCartItem(userId, productId, quantity);
            return ResponseEntity.ok(WebResponse.success(null, "Item quantity decreased"));
        } catch (Exception e) {
            log.error("[CartController] decreaseCartItem error", e);
            return ResponseEntity.badRequest().body(WebResponse.failure(e.getMessage()));
        }
    }

    /**
     * Delete item from cart
     * @param principalDetails
     * @param cartItem
     * @return
     */
    @PostMapping("/delete")
    public ResponseEntity<WebResponse<?>> deleteCartItem(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestBody CartRequestDto cartItem
    ) {
        Long userId = principalDetails.getUserId();
        log.info("[CartController] deleteCartItem request from userId {}", userId);

        Long productId = cartItem.getProductId();

        try {
            cartService.deleteCartItem(userId, productId);
            return ResponseEntity.ok(WebResponse.success(null, "Item deleted from cart"));
        } catch (Exception e) {
            log.error("[CartController] deleteCartItem error", e);
            return ResponseEntity.badRequest().body(WebResponse.failure(e.getMessage()));
        }
    }


    /**
     * Merge local cart to DB cart
     * @param principalDetails
     * @param cartRequestDtoList
     */
    @PostMapping("/merge")
    public ResponseEntity<WebResponse<?>> mergeCart(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestBody List<CartRequestDto> cartRequestDtoList
    ) {
        Long userId = principalDetails.getUserId();
        log.info("[CartController] mergeCart request from userId {}", userId);

        try {
            cartService.mergeCartItems(userId, cartRequestDtoList);
            return ResponseEntity.ok(WebResponse.success(null, "Cart merged successfully"));
        } catch (Exception e) {
            log.error("[CartController] mergeCart error", e);
            return ResponseEntity.badRequest().body(WebResponse.failure(e.getMessage()));
        }
    }
}
