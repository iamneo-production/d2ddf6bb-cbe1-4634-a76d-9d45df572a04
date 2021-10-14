package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import java.util.*;
import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.OrderModel;
import com.examly.springapp.model.ProductModel;
import com.examly.springapp.repository.OrderRepository;

// @Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private ProductService productService;

    /*
    i. List<OrderTemp> getUserProducts(String id): This method helps to
    list the orders based on the user id.
    ii. saveProduct(String id): This method helps to save the cart items as an
    order.
    iii. placeOrder(OrderModel order): This method helps to place an order
    by the customer.
     */

    public List<OrderModel> getUserProducts(Long id) {
        List<OrderModel> userProducts = orderRepository.findAllByUserId(id);
        return userProducts;
    }


    /*
        Assuming the id is userId
     */
    public ResponseEntity<String> saveProduct(Long id) {
        List<CartModel> cartItems = cartService.showCart(id);
        for (CartModel cartItem : cartItems) {
            OrderModel order = getOrder(cartItem);
            placeOrder(order, cartItem.getProductId());
        }
        return ResponseEntity.ok("Cart items added to the Orders list.");
    }
    
    public ResponseEntity<String> placeOrder(OrderModel order, String id) {
        ProductModel product = productService.getProduct(id);
        int quantity = Integer.parseInt(product.getQuantity());
        int asked = order.getQuantity();
        int newQuantity = quantity - asked;
        product.setQuantity(Integer.toString(newQuantity));
        orderRepository.save(order);
        productService.addProduct(product);
        return ResponseEntity.ok(String.format("Placed %s to order directly.", order.getProductName()));
    }

    private OrderModel getOrder(CartModel cartItem) {
        ProductModel product = productService.getProduct(cartItem.getProductId());
        OrderModel order = new OrderModel();
        order.setUserId(cartItem.getUserId());
        order.setProductName(cartItem.getProductName());
        order.setQuantity(cartItem.getQuantity());
        order.setPrice(product.getPrice());
        order.setTotalPrice(Integer.toString(order.getQuantity()*Integer.parseInt(order.getPrice())));
        order.setStatus("Ordered");
        order.setOrderedDate(Calendar.getInstance().toString());
        return order;
    }
}