package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;

import com.examly.springapp.repository.CartRepository;
import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.ProductModel;
import com.examly.springapp.model.AuditModel;
import java.util.List;
import java.util.concurrent.atomic.LongAccumulator;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private AuditService auditService;

    /*
    i. addToCart(String Quantity, String id): This method helps the customer
    to add the product to the cart.
    ii. List<CartTempModel> showCart(String id): This method helps to view
    the cart items.
    iii. deleteCartItem(String id): This method helps to delete a product from
    the cart.
    */

    /* 
        id is probably product id, quantity as requested by user, 
        should only add if that much available
     */
    public ResponseEntity<String> addToCart(String quantity, String id, Long userId) {
        ProductModel product = productService.getProduct(id);
        int available = Integer.parseInt(product.getQuantity());
        int asked = Integer.parseInt(quantity);
        
        if (available < asked) { // do not have enough items
             return ResponseEntity
             .badRequest()
             .header("Error-Message", String.format("Only %d %s left", available, product.getProductName()))
             .body("FALSE");
        }

        int totalCartItems = 0, LIMIT = 5;
        for (CartModel cm : showCart(userId)) { // There should be a maximum of 5 products per cart.
            totalCartItems += cm.getQuantity();
        }
        if (totalCartItems > LIMIT - asked) {
            return ResponseEntity
            .badRequest()
            .header("Error-Message", String.format("Cannot have more than %d items in Cart.", LIMIT))
            .body("FALSE");
        }
        
        CartModel cartItem = new CartModel();
        cartItem.setUserId(userId);
        cartItem.setProductId(id);
        cartItem.setProductName(product.getProductName());
        cartItem.setQuantity(asked);
        cartItem.setPrice(product.getPrice());
        cartItem.setImageUrl(product.getImageUrl());
        cartRepository.save(cartItem);
        
        auditService.saveAudit(new AuditModel(userId, String.format("%s %s added to cart by user", quantity, product.getProductName())));
        return ResponseEntity.ok(String.format("%s %s added to cart", quantity, product.getProductName()));
    }

    /* 
      id is User Id.
     */
    public List<CartModel> showCart(Long id) {
        List<CartModel> cart = cartRepository.findAllByUserId(id);

        return cart;
    }

    /*
        id is of CartModel
     */
    public ResponseEntity<String> deleteCartItem(Long id, Long userId) {
        if (!cartRepository.existsById(id)) {
            return ResponseEntity
            .badRequest()
            .header("Error-Message", "Cart Item does not exist.")
            .body("FALSE");
        }
        CartModel cartItem = cartRepository.findById(id).get();
        cartRepository.deleteById(id);
        auditService.saveAudit(new AuditModel(userId, String.format("%s removed from cart by user", cartItem.getProductId())));
        return ResponseEntity.ok("Cart Item deleted.");
    }
}
