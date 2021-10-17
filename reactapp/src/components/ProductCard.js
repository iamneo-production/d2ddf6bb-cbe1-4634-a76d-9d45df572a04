import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ApiClient, doUrlEncodedRequest } from '../utils/ApiClient';
import { openSnackbar } from '../utils/Reducer';
import { useStateValue } from "../utils/StateProvider";
import LoadingButton from '@mui/lab/LoadingButton';

function ProductCard(props) {
    const history = useHistory();

    let [state, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);

    const addToCart = () => {
        setLoading(true);
        ApiClient(doUrlEncodedRequest('POST', { quantity: 1 }, `/home/${props.product.productId}`)).then(response => {
        if (response.data) {
          dispatch(openSnackbar(`${props.product.productName} is now added to cart.`, 'success'));
        }
      }).finally(() => setLoading(false));
    }

    const deleteItem = () => {
        setLoading(true);
        ApiClient.delete(`/admin/delete/${props.product.productId}`).then(response => {
        if (response.data) {
          dispatch(openSnackbar(`${props.product.productName} is now deleted!`, 'success'));
          props.deleteItem();
        }
      }).finally(() => setLoading(false));
    }

    return (
        <Card raised elevation={3} style={
            props.admin && props.product.quantity <= 10 ?  { backgroundColor: '#d32f2f' } : {}
        }>
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
                {props.admin ? <Typography variant="body2" color="text.secondary">
                    {props.product.quantity} items left
                </Typography> : ''}                                 
            </CardContent>
            {
                props.admin ? 
                <CardActions>
                    <CardActions>
                    <Button size="small" onClick={() => {
                        history.push('/editProduct/' + props.product.productId);
                    }} variant="contained">Edit</Button>
                    <LoadingButton size="small" color="error" variant="contained" onClick={deleteItem} loading={loading} loadingIndicator="Deleting...">
                        Delete
                    </LoadingButton>
                </CardActions>
                </CardActions> :
                <CardActions>
                    <Button size="small" onClick={() => {
                        history.push('/product/' + props.product.productId);
                    }}>View</Button>
                    <LoadingButton size="small" onClick={addToCart} loading={loading} loadingIndicator="Adding...">Add to Cart</LoadingButton>
                </CardActions>
            }
            
        </Card>
    )
}

export default ProductCard;