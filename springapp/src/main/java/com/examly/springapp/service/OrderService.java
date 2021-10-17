package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import java.util.*;
import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.OrderModel;
import com.examly.springapp.model.ProductModel;
import com.examly.springapp.model.AuditModel;
import com.examly.springapp.model.PaymentModel;
import com.examly.springapp.repository.PaymentRepository;
import com.examly.springapp.repository.OrderRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Order;
import com.razorpay.Utils;
import org.json.JSONObject;


@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PaymentRepository paymentRepository;
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

    public ResponseEntity<String> processRazorpayPayment(JSONObject payload, Long userId) {
        try {
            if (Utils.verifyPaymentSignature(payload, "LpkiIKHHHNKLSEoAUiHAvuS6")) {
                // set order as paid and save other details
                String razorPayOrderId = payload.getString("razorpay_order_id");
                String razorPayPaymentId = payload.getString("razorpay_payment_id");
                String razorPaySignature = payload.getString("razorpay_signature");
                PaymentModel payment = paymentRepository.findByRazorPayOrderId(razorPayOrderId);
                payment.setPaymentId(razorPayPaymentId);
                payment.setSignature(razorPaySignature);
                paymentRepository.save(payment);
                OrderModel order = orderRepository.findByOrderId(payment.getOrderId());
                order.setStatus("Paid");
                orderRepository.save(order);
                auditService.saveAudit(new AuditModel(userId, "Payment processed for order id: " + order.getOrderId()));
                return ResponseEntity.ok("Order Processed successfully.");
            }
            else {
                return ResponseEntity
                    .badRequest()
                    .header("Error-Message", "Invalid Payment Signature")
                    .body("FALSE");
            }
        }
        catch (RazorpayException e) {
            // Handle Exception
            System.out.println(e.getMessage());
            return ResponseEntity
            .badRequest()
            .header("Error-Message", "RazorPay Error")
            .body("FALSE");
        }
    }

    public ResponseEntity<String> makeRazorpayOrder(String price, Long orderId, Long userId) {
        try {
            RazorpayClient razorpay = new RazorpayClient("rzp_test_HwygC9FrX26ndC", "LpkiIKHHHNKLSEoAUiHAvuS6");
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", Integer.parseInt(price) * 100); // amount in the smallest currency unit
            orderRequest.put("currency", "INR");
            Order razorPayOrder = razorpay.Orders.create(orderRequest);
            PaymentModel payment = new PaymentModel(razorPayOrder.get("id"), orderId, userId);
            paymentRepository.save(payment);
            
            return ResponseEntity.ok(razorPayOrder.get("id"));
        }
        catch (RazorpayException e) {
            // Handle Exception
            System.out.println(e.getMessage());
            return ResponseEntity
            .badRequest()
            .header("Error-Message", "RazorPay Error")
            .body("FALSE");
        }        
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

        // check if product price has changed
        if (!product.getPrice().equals(order.getPrice())) {
            return ResponseEntity
            .badRequest()
            .header("Error-Message", String.format("The price of %s has changed since you last ordered. Please refresh the page and try again.", product.getProductName()))
            .body("FALSE");
        }
        OrderModel newOrder = new OrderModel(userId, order.getProductName(), order.getQuantity(), order.getPrice());

        product.setQuantity(Integer.toString(newQuantity));
        orderRepository.save(newOrder);
        productService.addProduct(product);
        auditService.saveAudit(new AuditModel(userId, String.format("Placed %s to order", order.getProductName())));
        
        return this.makeRazorpayOrder(newOrder.getTotalPrice(), newOrder.getOrderId(), userId);
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

    public ResponseEntity<String> updateStatus(String status, Long orderId, Long userId) {
        OrderModel order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            return ResponseEntity
            .badRequest()
            .header("Error-Message", orderId + " OrderId does not exist.")
            .body("FALSE");
        }
        order.setStatus(status);
        auditService.saveAudit(new AuditModel(userId, "Admin changed Order Status of Order "+orderId));
        return ResponseEntity.ok("Updated Status of order "+ orderId);
    }
}