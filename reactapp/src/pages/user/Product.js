import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { useStateValue } from '../../utils/StateProvider';
import { useParams } from 'react-router-dom';
import { Box, Grid, Stack, Typography, Button } from '@mui/material';

function Product() {
    const { productId } = useParams();
    const similarPricedProducts = [];

    // get list of products from state
    let [{ products }, dispatch] = useStateValue();
    
    // set product
    const product = products.find(x => x.productId === parseInt(productId)) ?? {};

    if (!product.productId) {
        // didnt find product - show error toast and redirect to products page
        
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

    return (
        <Box sx={{ textAlign: 'left' }}>
            <Navbar/>
            <Grid container maxWidth="md" spacing={3} sx={{ m: 'auto' }}>
                <Grid item xs={12} sm={6} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <img src={product.imageUrl} style={{ maxWidth: '27.5vw' }} />
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
                            <Button variant="outlined">Add to Cart</Button>
                            <Button variant="contained" color="secondary">Buy Now</Button>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Stack maxWidth="lg" spacing={1} sx={{ mx: 'auto', my: 3, px: 2 }}>
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