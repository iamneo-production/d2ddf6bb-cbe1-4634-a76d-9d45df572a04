import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function ProductCard(props) {
    const history = useHistory();

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
                <Button size="small">Add to Cart</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;