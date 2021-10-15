package com.examly.springapp.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import java.util.*;
import com.examly.springapp.model.OrderModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.service.OrderService;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;
    /*
    i. List<OrderTemp> getUserProducts(String id): This method helps to
    list the orders based on the user id.
    ii. saveProduct(String id): This method helps to save the cart items as an
    order.
    iii. placeOrder(OrderModel order): This method helps to place an order
    by the customer.
     */

    @RequestMapping(method=RequestMethod.GET, value="/orders")
    public List<OrderModel> getUserProducts(@AuthenticationPrincipal UserModel user) {
        return orderService.getUserProducts(user.getId());
    }

    /*
        Assuming the id is userId
     */
    @RequestMapping(method=RequestMethod.POST, value="/saveOrder")
    public ResponseEntity<String> saveProduct(@AuthenticationPrincipal UserModel user) {
        return orderService.saveProduct(user.getId());
    }
    
    @RequestMapping(method=RequestMethod.POST, value="/placeOrder/{id}")
    public ResponseEntity<String> placeOrder(@RequestBody OrderModel order, @PathVariable String id) {
        return orderService.placeOrder(order, id);
    }
}