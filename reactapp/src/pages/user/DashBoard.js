import { useStateValue } from '../../utils/StateProvider';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';
import BannerCard from '../../components/BannerCard'
import { actionTypes, SortBy } from '../../utils/Reducer';
import { Box, Stack, Grid, Typography, Fab } from '@mui/material';
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function DashBoard() {
    // get filter state and products
    let [{ filter, products , banners }, dispatch] = useStateValue();
    
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

    const history = useHistory();


    return (
        <Box sx={{ textAlign: 'left' }}>
            <Navbar />

            <Carousel 
              autoPlay = {true} 
              interval = {5000} 
              infiniteLoop = {true} 
              onClickItem = {(index , item)=>{history.push('/product/' + item.props.banner.productId);}}>
                {
                  banners.map(banner=>{
                    return <BannerCard banner = {banner}/>
                  })
                }
            </Carousel>
            <Stack direction="row" spacing={{ xs: 0, md: 2 }} sx={{ pt: 3 }}>
                <Sidebar />
                <Box component="main" sx={{ px: 2, width: '100%' }}>
                    <Grid id = "mobileHomeBody" container spacing={3}>
                        {products.map((product, i) => {
                            return <Grid item xs={6} sm={4} lg={4} xl={3} key={i}>
                                <ProductCard product={product} />
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

export default DashBoard;