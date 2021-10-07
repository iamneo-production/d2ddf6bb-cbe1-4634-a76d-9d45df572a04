import { useStateValue } from '../utils/StateProvider';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { actionTypes, SortBy } from '../utils/Reducer';
import { Box, Stack, Grid, Card, CardMedia, CardActions, CardContent, Typography, Button, Fab } from '@mui/material';
import { Icon } from '@iconify/react';

function SidebarDemo() {
    // get filter state and products
    let [{ filter, products }, dispatch] = useStateValue();
    console.log(filter)
    console.log(products)
    products = products.filter(product => {
        if (filter.productName !== '' && product.productName.indexOf(filter.productName) === -1) {
            return false;
        }

        if (product.price < filter.priceRangeFrom || (product.price > filter.priceRangeTo && filter.priceRangeTo !== 20000)) {
            return false;
        }

        if (filter.ram.length > 0) {
            let found = false;
            for (let ram of filter.ram) {
                if (product.description.indexOf(ram) !== -1) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                return false;
            }
        }

        if (filter.storage.length > 0) {
            let found = false;
            for (let storage of filter.storage) {
                if (product.description.indexOf(storage) !== -1) {
                    found = true;
                    break;
                }
            }
    
            if (!found) {
                return false;
            }
        }

        return true;
    }).sort((a, b) => {
        if (filter.sort === SortBy.PriceLowToHigh) {
            return a.price - b.price;
        }
        else if (filter.sort === SortBy.PriceHighToLow) {
            return b.price - a.price;
        }
    });

    return (
        <Box sx={{ textAlign: 'left' }}>
            <Navbar />
            <Stack direction="row" spacing={{ xs: 0, md: 2 }} sx={{ pt: 3 }}>
                <Sidebar />
                <Box component="main" sx={{ px: 2, width: '100%' }}>
                    <Grid container spacing={3}>
                        {products.map((product, i) => {
                            return <Grid item xs={6} sm={4} lg={4} xl={3} key={i}>
                                <Card raised elevation={3}>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={product.imageUrl}
                                        alt={product.productName}
                                        sx={{ objectFit: 'contain', pt: '1rem' }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="body1" component="div">
                                            {product.productName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ₹{product.price}
                                        </Typography>                                 
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Add to Cart</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        })}                        
                    </Grid>
                </Box>
            </Stack>

            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '2rem', right: '2rem', display: { md: 'none' } }} onClick={() => {
                dispatch({
                    type: actionTypes.SET_FILTER_TOGGLE,
                    filterToggle: true
                });
            }}>
                <Icon icon="fa-solid:filter" />
            </Fab>
        </Box>
    );
}

export default SidebarDemo;