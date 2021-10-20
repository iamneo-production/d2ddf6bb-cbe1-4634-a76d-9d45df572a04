import { useStateValue } from '../../utils/StateProvider';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';
import BannerCard from '../../components/BannerCard'
import { actionTypes, SortBy } from '../../utils/Reducer';
import { Box, Stack, Grid, Fab, Skeleton } from '@mui/material';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ApiClient } from '../../utils/ApiClient';

function DashBoard() {
    // get filter state and products
    let [{ filter, products, banners }, dispatch] = useStateValue();

    let [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        ApiClient.get('/home').then(response => {
            dispatch({
                type: actionTypes.SET_PRODUCTS,
                products: response.data.map(x => ({
                    ...x,
                    price: parseInt(x.price),
                    quantity: parseInt(x.quantity),
                    manufacturedDate: new Date(x.manufacturedDate)
                }))
            });

            setProductsLoaded(true);
        });
    }, []);

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
        else {
            return b.manufacturedDate.getTime() - a.manufacturedDate.getTime();
        }
    });
    
    

    return (
        <Box sx={{ textAlign: 'left' }}>
            <Navbar />

            <Carousel 
              style={{paddingTop: '75px'}}
              autoPlay = {true} 
              interval = {5000} 
              infiniteLoop = {true} 
              >
                {
                  banners.map(banner=>{
                    return <BannerCard banner = {banner} key={banner.productId}  />
                  })
                }
            </Carousel>
            <h2 style={{ margin: '0rem 1rem' }}>Our Range of Products</h2>
            <Stack direction="row" spacing={{ xs: 0, md: 2 }} sx={{ pt: 3 }}>
                <Sidebar />
                <Box component="main" sx={{ px: 2, width: '100%' }}>
                    <Grid id = "mobileHomeBody" container spacing={3}>
                        {
                            productsLoaded ? 
                            products.map((product, i) => {
                                return <Grid item xs={6} sm={4} lg={4} xl={3} key={i}>
                                    <ProductCard product={product} />
                                </Grid>
                            }) : 
                            [...Array(12)].map((e, i) => {
                                return <Grid item xs={6} sm={4} lg={4} xl={3} key={i}>
                                    <Skeleton variant="rectangular" height={200} animation="wave" /> 
                                </Grid>
                            })
                        }                    
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

export default DashBoard;