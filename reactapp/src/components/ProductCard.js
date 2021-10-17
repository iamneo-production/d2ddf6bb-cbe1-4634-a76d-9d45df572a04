import { Card, CardMedia, CardActions, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
    const [open, setOpen] = useState(false);

    const addToCart = () => {
        setLoading(true);
        ApiClient(doUrlEncodedRequest('POST', { quantity: 1 }, `/home/${props.product.productId}`)).then(response => {
        if (response.data) {
          dispatch(openSnackbar(`${props.product.productName} is now added to cart.`, 'success'));
        }
      }).finally(() => setLoading(false));
    }

    const deleteItem = () => {
        setOpen(false);
        setLoading(true);
        ApiClient.delete(`/admin/delete/${props.product.productId}`).then(response => {
        if (response.data) {
          dispatch(openSnackbar(`${props.product.productName} is now deleted!`, 'success'));
          props.deleteItem();
        }
      }).finally(() => setLoading(false));
    }

    const handleClose = () => {
        setOpen(false);
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
                {props.admin ? <Typography variant="body2" color="text.secondary" style={
                    props.product.quantity <= 10 ?  { color: '#d32f2f', fontWeight: 'bold' } : {}
                }>
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
                    <LoadingButton size="small" color="error" variant="contained" onClick={() => setOpen(true)} loading={loading} loadingIndicator="Deleting...">
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
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Delete {props.product.productName}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will permanently delete this product. This action is not undoable.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={deleteItem} autoFocus>
                    Confirm Deletion
                </Button>
                </DialogActions>
            </Dialog>            
        </Card>
    )
}

export default ProductCard;