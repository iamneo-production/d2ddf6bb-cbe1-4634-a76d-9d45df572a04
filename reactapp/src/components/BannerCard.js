import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function BannerCard({banner}) {
    const history = useHistory();

    return (
      <div>
        <a href  = {`/product/${banner.productId}`}><img  style = {{height : '50vh' , objectFit : 'cover'}}  src = {banner.bannerUrl}/></a>
      </div>
    )
}

export default BannerCard;