package com.examly.springapp.repository;

import org.springframework.data.repository.CrudRepository;
<<<<<<< HEAD
import com.examly.springapp.model.CartModel;
import java.util.List;
=======
>>>>>>> a2ceb76 (Implement CartController, CartRepository and CartService.)

public interface CartRepository extends CrudRepository<CartModel, String> {

    //findBy__
    /*
    userId : UserModel is attribute in CartMode, email is id of UserModel
     */
    List<CartModel> findAllByUserIdEmail(String id);

<<<<<<< HEAD
}
=======
}
>>>>>>> a2ceb76 (Implement CartController, CartRepository and CartService.)
