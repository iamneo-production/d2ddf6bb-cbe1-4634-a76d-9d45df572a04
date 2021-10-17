import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { openSnackbar } from "../../utils/Reducer";
import { ApiClient, doUrlEncodedRequest } from '../../utils/ApiClient';
import { useStateValue } from '../../utils/StateProvider';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Grid, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

function Product() {
    const { productId } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const similarPricedProducts = [];

    // get list of products from state
    let [{ products }, dispatch] = useStateValue();
    
    // set product
    const product = products.find(x => x.productId === productId) ?? {};

    if (!product.productId) {        
        dispatch(openSnackbar('This product does not seem to be available anymore!', 'error'));
        history.push('/');
    }
    else {
        // populate products with similar price
        similarPricedProducts.push(
            ...products
                .sort((a, b) => Math.abs(a.price - product.price) - Math.abs(b.price - product.price))
                .filter(x => x.productId !== product.productId)
                .slice(0, 4)
        );
    }

    const addToCart = () => {
        setLoading(true);
        ApiClient(doUrlEncodedRequest('POST', { quantity: 1 }, `/home/${product.productId}`)).then(response => {
        if (response.data) {
          dispatch(openSnackbar(`${product.productName} is now added to cart.`, 'success'));
        }
      }).finally(() => setLoading(false));
    }

    const buyNow = () => {
        setLoading2(true);
        ApiClient.post(`/placeOrder/${product.productId}`, {
            productName: product.productName,
            quantity: 1,
            price: product.price
        }).then(response => {
        if (response.data) {
          dispatch(openSnackbar(`An order for ${product.productName} has been placed.`, 'success'));
        }
      }).finally(() => setLoading2(false));
    }

    return (
        <Box sx={{ textAlign: 'left' }}>
            <Navbar/>
            <Grid container maxWidth="md" spacing={3} sx={{ m: 'auto' }}>
                <Grid item xs={12} sm={6} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <img src={product.imageUrl} alt={product.productName} style={{ maxWidth: '27.5vw' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={1} sx={{ pt: 3 }}>
                        <Typography gutterBottom variant="h3" component="div" sx={{ display: { xs: 'none', md: 'block' } }}>
                            {product.productName}
                        </Typography>
                        <Typography gutterBottom variant="h4" component="div" sx={{ display: { xs: 'block', md: 'none' } }}>
                            {product.productName}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Specifications
                        </Typography>
                        <Typography variant="body1" component="pre" sx={{ whiteSpace: 'break-spaces' }}>
                            {product.description}
                        </Typography>
                        <Typography variant="h5" component="div">
                            ₹{product.price}
                        </Typography>
                        <Stack spacing={2} direction="row">
                            <LoadingButton variant="outlined" onClick={addToCart} loading={loading} loadingIndicator="Adding...">
                                Add to Cart
                            </LoadingButton>
                            <LoadingButton variant="contained" color="secondary" onClick={buyNow} loading={loading2} loadingIndicator="Buying...">
                                Buy Now
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Stack maxWidth="lg" spacing={1} sx={{ mx: 'auto', my: 5, px: 2 }}>
                <Typography variant="h4" component="div">
                    Similarly Priced Phones
                </Typography>
                <Grid container spacing={{ xs: 1, sm: 3 }} sx={{ mx: 'auto' }}>
                    {similarPricedProducts.map((x, i) => {
                        return <Grid item xs={6} sm={4} lg={4} xl={3} key={i}>
                            <ProductCard product={x} />
                        </Grid>
                    })}
                </Grid>
            </Stack>
        </Box>
    )
}

export default Product;