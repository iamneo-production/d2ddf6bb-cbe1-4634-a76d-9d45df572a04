package com.examly.springapp.repository;


import org.springframework.data.repository.CrudRepository;
import com.examly.springapp.model.PaymentModel;
import java.util.List;

public interface PaymentRepository extends CrudRepository<PaymentModel, Long> {
    PaymentModel findByRazorPayOrderId(String orderId);
}
