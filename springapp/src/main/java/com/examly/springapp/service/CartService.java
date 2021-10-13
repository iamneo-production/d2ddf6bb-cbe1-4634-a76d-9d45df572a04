package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;

import com.examly.springapp.repository.CartRepository;
import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.ProductModel;
import java.util.List;
import java.util.concurrent.atomic.LongAccumulator;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductService productService;

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
    public ResponseEntity<String> addToCart(String quantity, String id) {
        /*
        ProductModel product = productService.getProduct(id);
        int available = Integer.parseInt(product.getQuantity());
        int asked = Integer.parseInt(quantity);
        
        if (available < asked) { // do not have enough items
             return ResponseEntity.
             badRequest().
             body(String.format("Only %d %s left", available, product.getProductName()));
        }

        Long userId = 100;// get current userId here
        int totalCartItems = 0, LIMIT = 5;
        for (CartModel cm : showCart(userId)) { // There should be a maximum of 5 products per cart.
            totalCartItems += cm.getQuantity();
        }
        if (totalCartItems + asked > LIMIT) {
            return ResponseEntity.
             badRequest().
             body(String.format("Cannot have more than %d items in Cart, You can add %d more items.", LIMIT, LIMIT-totalCartItems));
        }
        
        // public CartModel(String cartItemId, Long userId, String productName, int quantity, String price)
        CartModel cartItem = new CartModel(id, userId, product.getProductName(), asked, product.getPrice());
        cartRepository.save(cartItem);
        return ResponseEntity.ok(String.format("%s %s added to cart", quantity, product.getName()));
        */
        return ResponseEntity.ok("Need access to current UserId");
    }

    /* 
      After adding product to cart, this method would be called to show user cart.
      thus updating numberOfProducts to its correct value.
     */
    public List<CartModel> showCart(Long id) {
        List<CartModel> cart = cartRepository.findAllByUserId(id);

        return cart;
    }

    /*
        id is of CartModel
     */
    public ResponseEntity<String> deleteCartItem(String id) {
        if (!cartRepository.existsById(id)) return ResponseEntity.badRequest().body("Cart Item does not exist.");
        cartRepository.deleteById(id);
        return ResponseEntity.ok("Cart Item deleted.");
    }
}
