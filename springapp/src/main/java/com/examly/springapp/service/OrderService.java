package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import java.util.*;
import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.OrderModel;
import com.examly.springapp.model.ProductModel;
import com.examly.springapp.model.AuditModel;
import com.examly.springapp.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private ProductService productService;
    @Autowired
    private AuditService auditService;

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
    public ResponseEntity<String> saveProduct(Long userId) {
        List<CartModel> cartItems = cartService.showCart(userId);
        List<Long> removeId = new ArrayList<>(cartItems.size());
        for (CartModel cartItem : cartItems) {
            OrderModel order = getOrder(cartItem);
            placeOrder(order, cartItem.getProductId(), userId);
            removeId.add(cartItem.getCartItemId());
        }
        for (Long cartItemId : removeId) {
            cartService.deleteCartItem(cartItemId, userId);
        }
        auditService.saveAudit(new AuditModel(userId,"Cart Items moved to Order."));
        return ResponseEntity.ok("Cart items added to the Orders list.");
    }
    
    public ResponseEntity<String> placeOrder(OrderModel order, String productId, Long userId) {
        ProductModel product = productService.getProduct(productId);
        int quantity = Integer.parseInt(product.getQuantity());
        int asked = order.getQuantity();
        int newQuantity = quantity - asked;
        if (newQuantity < 0) {
            return ResponseEntity
            .badRequest()
            .header("Error-Message", String.format("Only %d %s left.", quantity, product.getProductName()))
            .body("FALSE");
        }
        product.setQuantity(Integer.toString(newQuantity));
        orderRepository.save(order);
        productService.addProduct(product);
        auditService.saveAudit(new AuditModel(userId, String.foramt("Placed %s to order", order.getProductName())));
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
        order.setOrderedDate(Calendar.getInstance().getTime().toString());
        return order;
    }
}