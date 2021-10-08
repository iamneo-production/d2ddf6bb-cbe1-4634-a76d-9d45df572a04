package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.examly.springapp.model.OrderModel;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    /*
    i. List<OrderTemp> getUserProducts(String id): This method helps to
    list the orders based on the user id.
    ii. saveProduct(String id): This method helps to save the cart items as an
    order.
    iii. placeOrder(OrderModel order): This method helps to place an order
    by the customer.
     */

    public List<OrderModel> getUserProducts(String id) {
        List<OrderModel> userProducts = orderRepository.findAllByUserId(id);
        return userProducts;
    }


    /*
        Assuming the id is userId
     */
    public ResponseEntity<String> saveProduct(String id) {
        List<CartModel> cartItems = showCart(id);
        for (CartModel cartItem : cartItems) {
            OrderModel order = getOrderAndRemoveFromCart(cartItem, id);
            placeOrder(order);
        }
        return ResponseEntity.ok("Cart items added to the Orders list.");
    }
    
    /*
        it requires product id, but not in srs
        Currently not updating available products after placing order
     */
    public ResponseEntity<String> placeOrder(OrderModel order) {
        orderRepository.save(order);
        return ResponseEntity.ok(String.format("Placed %s to order directly.", order.getProductName()));
    }

    private OrderModel getOrderAndRemoveFromCart(CartModel cartItem, String id) {
        OrderModel order = new OrderModel();
        order.setUserId(id);
        order.setProductName(cartItem.getProductName());
        order.setQuantity(cartItem.getQuantity());
        int price = cartItem.getPrice(), quantity = cartItem.getQuantity();
        order.setTotalPrice(new String(price*quantity));
        order.setStatus();
        order.setPrice(cartItem.getPrice());
        deleteCartItem(cartItem.getId());
        return order;
    }
}
