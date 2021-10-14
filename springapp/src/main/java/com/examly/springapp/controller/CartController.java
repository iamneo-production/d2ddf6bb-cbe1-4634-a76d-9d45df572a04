package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.service.CartService;
import com.examly.springapp.model.CartModel;
import java.util.List;

@RestController
public class CartController {
    
    @Autowired
    private CartService cartService;

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
    @RequestMapping(method=RequestMethod.POST, value="/home/{id}")
    public ResponseEntity<String> addToCart(@RequestBody String quantity, @PathVariable String id) {
        return cartService.addToCart(quantity, id);
    }

    /*
     probably user id, will send all the cart having that id
     might need to match with current user id, for security reasons.
    */
    @RequestMapping(method=RequestMethod.GET, value="/cart/{id}")
    public List<CartModel> showCart(@PathVariable Long id) {
        return cartService.showCart(id);
    }

    /* 
        srs has
         /cart/delete
    */
    @RequestMapping(method=RequestMethod.DELETE, value="/cart/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long id) {
        return cartService.deleteCartItem(id);
    }
}
