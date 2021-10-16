import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ApiClient } from '../utils/ApiClient';
import { openSnackbar } from '../utils/Reducer';
import { useStateValue } from "../utils/StateProvider";
import LoadingButton from '@mui/lab/LoadingButton';

function ProductCard(props) {
    const history = useHistory();

    let [state, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);

    const addToCart = () => {
        setLoading(true);
        ApiClient.post(`/home/${props.product.productId}`, { quantity: 1 }).then(response => {
        if (response.data) {
          console.log(response.data);

          dispatch(openSnackbar(`${props.product.productName} is now added to cart.`, 'success'));
        }
      }).finally(() => setLoading(false));
    }

    return (
        <Card raised elevation={3}>
            <CardMedia
                component="img"
                height="160"
                image={props.product.imageUrl}
                alt={props.product.productName}
                sx={{ objectFit: 'contain', pt: '1rem' }}
            />
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    {props.product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ₹{props.product.price}
                </Typography>                                 
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => {
                    history.push('/product/' + props.product.productId);
                }}>View</Button>
                <LoadingButton size="small" onClick={addToCart} loading={loading} loadingIndicator="Adding...">Add to Cart</LoadingButton>
            </CardActions>
        </Card>
    )
}

export default ProductCard;