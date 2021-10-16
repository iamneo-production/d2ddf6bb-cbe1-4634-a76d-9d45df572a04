import { useStateValue } from '../utils/StateProvider';
import { actionTypes, SortBy } from '../utils/Reducer';
import { Box, Drawer, Paper, Typography, Stack, Divider, Autocomplete, TextField, ToggleButton, ToggleButtonGroup, Slider } from '@mui/material';
import { InlineIcon } from '@iconify/react';


function Sidebar() {
    // get filter state
    let [{ filter, filterToggle, products }, dispatch] = useStateValue();

    const drawerWidth = 300;

    const handleDrawerToggle = () => {
        dispatch({
            type: actionTypes.SET_FILTER_TOGGLE,
            filterToggle: !filterToggle
        });
    };

    const drawer = (
        <Stack spacing={3} sx={{ py: { xs: 3, sm: 3, md: 3, lg: 0, xl: 0 } }}>
            <Box sx={{ px: 3 }}>
                <Stack spacing={2}>
                    <Typography gutterBottom variant="h5">
                        <InlineIcon icon="fa-solid:filter" /> Filter
                    </Typography>
                    <Autocomplete
                        id="product-name-filter"
                        freeSolo
                        options={products.map(product => product.productName)}
                        renderInput={(params) => <TextField fullWidth {...params} label="Product Name" value={filter.productName} />}
                        onInputChange={(event, productName) => {
                            dispatch({
                                type: actionTypes.SET_FILTERS,
                                filter: { ...filter, productName }
                            });
                        }}
                    />
                    <Typography variant="body1">
                        Price Range
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={[filter.priceRangeFrom, filter.priceRangeTo]}
                        onChange={(event, [priceRangeFrom, priceRangeTo]) => {
                            dispatch({
                                type: actionTypes.SET_FILTERS,
                                filter: { ...filter, priceRangeFrom, priceRangeTo }
                            });
                        }}
                        disableSwap
                        step={null}
                        min={0}
                        max={20000}
                        marks={[
                            { value: 0, label: '₹0' },
                            { value: 5000, label: '₹5K' },
                            { value: 10000, label: '₹10K' },
                            { value: 15000, label: '₹15K' },
                            { value: 20000, label: '₹20K+' },
                        ]}
                    />
                    <Typography variant="body1" sx={{pt: '1rem'}}>
                        RAM
                    </Typography>
                    <ToggleButtonGroup
                        value={filter.ram}
                        onChange={(event, ram) => {
                            dispatch({
                                type: actionTypes.SET_FILTERS,
                                filter: { ...filter, ram }
                            });
                        }}
                        size="small"
                        fullWidth={true}
                    >
                        <ToggleButton value="2GB RAM">
                            2 GB
                        </ToggleButton>
                        <ToggleButton value="4GB RAM">
                            4 GB
                        </ToggleButton>
                        <ToggleButton value="6GB RAM">
                            6 GB
                        </ToggleButton>
                        <ToggleButton value="8GB RAM">
                            8 GB
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Typography variant="body1">
                        Storage
                    </Typography>
                    <ToggleButtonGroup
                        value={filter.storage}
                        onChange={(event, storage) => {
                            dispatch({
                                type: actionTypes.SET_FILTERS,
                                filter: { ...filter, storage }
                            });
                        }}
                        size="small"
                        fullWidth={true}
                    >
                        <ToggleButton value="32GB storage">
                            32 GB
                        </ToggleButton>
                        <ToggleButton value="64GB storage">
                            64 GB
                        </ToggleButton>
                        <ToggleButton value="128GB storage">
                            128 GB
                        </ToggleButton>
                        <ToggleButton value="256GB storage">
                            256 GB
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Box>
            <Divider />
            <Box sx={{ px: 3, pb: 2 }}>
                <Stack spacing={2}>
                    <Typography gutterBottom variant="h5">
                        <InlineIcon icon="fa-solid:sort" /> Sort
                    </Typography>
                    <ToggleButtonGroup
                        value={filter.sort}
                        exclusive
                        onChange={(event, sort) => {
                            dispatch({
                                type: actionTypes.SET_FILTERS,
                                filter: { ...filter, sort }
                            });
                        }}
                        aria-label="sort"
                        size="small"
                        orientation="vertical"
                        fullWidth={true}
                    >
                        <ToggleButton value={SortBy.NewArrivals}>
                            New Arrivals
                        </ToggleButton>
                        <ToggleButton value={SortBy.PriceLowToHigh}>
                            Price: Low - High
                        </ToggleButton>
                        <ToggleButton value={SortBy.PriceHighToLow}>
                            Price: High - Low
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Box>
        </Stack>
      );

    return (
        <Box sx={{ width: { md: drawerWidth } }}>
            <Drawer
                variant="temporary"
                open={filterToggle}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: 'block', sm: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'relative', overflowY: 'visible' },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default Sidebar;