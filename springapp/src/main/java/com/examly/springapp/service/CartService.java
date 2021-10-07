package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.repository.CartRepository;
import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.ProductModel;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    private int numberOfProducts = 0;
    
    public void addToCart(String quantity, String id) {
        // functional requirement last point.
        if (numberOfProducts == 5) return;
        // ProductModel product = productEditData(id);
        // int available = Integer.parseInt(product.getQuantity()), asked = Integer.parseInt(quantity);
        // // do not have enough items
        // if (available < asked) return;
        CartModel cartItem = new CartModel();
        // cartItem.setProductName(product.getProductName());
        // cartItem.setQuantity(asked);
        // cartItem.setPrice(Integer.parseInt(product.getPrice()));
        // cartRepository.save(cartItem);
    }

    /* 
      After adding product to cart, this method would be called to show user cart.
      thus updating numberOfProducts to its correct value.
     */
    public List<CartModel> showCart(String id) {
        List<CartModel> cart = cartRepository.findAllByUserIdEmail(id);
        numberOfProducts = cart.size();
        return cart;
    }

    public void deleteCartItem(String id) {
        cartRepository.deleteById(id);
    }
}
