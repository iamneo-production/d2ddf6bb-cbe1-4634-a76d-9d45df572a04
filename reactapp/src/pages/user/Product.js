import Navbar from '../../components/Navbar';
import { useStateValue } from '../../utils/StateProvider';
import { useParams } from 'react-router-dom';

function Product() {
    const { productId } = useParams();

    // get list of products from state
    let [{ products }, dispatch] = useStateValue();
    
    // set product
    const product = products.find(x => x.productId === parseInt(productId)) ?? {};

    if (!product.productId) {
        // didnt find product - show error toast and redirect to products page
        
    }
    
    // show image on left, details & buttons on right
    // add to cart button, buy now button, go back to products list
    // product image, name, description, price, quantity left
    // product configuration (color, ram, storage options)
    // compare product with another product

    return (
        <div>
            <Navbar/>
            <h2>{product.productName}</h2>
        </div>
    )
}

export default Product;