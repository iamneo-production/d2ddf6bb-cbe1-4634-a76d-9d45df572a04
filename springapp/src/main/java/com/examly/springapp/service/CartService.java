package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;

import com.examly.springapp.repository.CartRepository;
import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.ProductModel;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

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
        // functional requirement last point needs explaination, not implemented.

        // ProductModel product = productEditData(id);
        // int available = Integer.parseInt(product.getQuantity()), asked = Integer.parseInt(quantity);
        // // do not have enough items
        // if (available < asked) {
        //      return ResponseEntity.
        //      badRequest().
        //      body(String.format("Cannot add more than %s %s in the cart", product.getQuantity(), product.getName()));
        // }
        CartModel cartItem = new CartModel();
        // cartItem.setProductName(product.getProductName());
        // cartItem.setQuantity(asked);
        // cartItem.setPrice(Integer.parseInt(product.getPrice()));
        // cartRepository.save(cartItem);
        // // decrease quantity available
        // product.setQuantity(new String (available - asked));
        // productEditSave(product);
        // return ResponseEntity.ok(String.format("%s %s added to cart", quantity, product.getName()));
        return ResponseEntity.ok("");
    }

    /* 
      After adding product to cart, this method would be called to show user cart.
      thus updating numberOfProducts to its correct value.
     */
    public List<CartModel> showCart(String id) {
        List<CartModel> cart = cartRepository.findAllByUserIdEmail(id);
        return cart;
    }

    /*
        id is of CartModel
     */
    public ResponseEntity<String> deleteCartItem(String id) {
        if (!cartRepository.existsById(id)) return ResponseEntity.badRequest().body("Cart Item does not exist.")
        cartRepository.deleteById(id);
        return ResponseEntity.ok("Cart Item deleted.");
    }
}
