import Navbar from "../../components/Navbar";
import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useStateValue } from "../../utils/StateProvider";
import { ApiClient } from '../../utils/ApiClient';
import { actionTypes, openSnackbar } from '../../utils/Reducer';
import LoadingButton from '@mui/lab/LoadingButton';

function AddProduct() {
    const [{ products }, dispatch] = useStateValue();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [quantity, setQuantity] = useState(0);

    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = () =>{
      setNameError(false);
      setPriceError(false);
      setDescriptionError(false);
      setImageUrlError(false);
      setQuantityError(false);

      if (name.trim() === '') {
        setNameError(true);
        dispatch(openSnackbar('Product Name cannot be empty.', 'error'));
        return;
      }

      if (price <= 0) {
        setPriceError(true);
        dispatch(openSnackbar('Product price must be a positive value.', 'error'));
        return;
      }

      if (description.trim() === '') {
        setDescriptionError(true);
        dispatch(openSnackbar('Description cannot be empty.', 'error'));
        return;
      }

      if (imageUrl.trim() === '') {
        setImageUrlError(true);
        dispatch(openSnackbar('Image URL cannot be empty.', 'error'));
        return;
      }

        try {
            new URL(imageUrl);
        }
        catch (_) {
            setImageUrlError(true);
            dispatch(openSnackbar('Invalid Image URL.', 'error'));
            return;
        }

      if (quantity <= 0) {
        setQuantityError(true);
        dispatch(openSnackbar('Quantity must be a positive value.', 'error'));
        return;
      }

      setLoading(true);
      ApiClient.post('/admin/addProduct', {
        productName: name, price, imageUrl, description, quantity
      }).then(response => {
        if (response.data) {            
          // success
          dispatch(openSnackbar('Product added successfully.', 'success'));
          dispatch({
                type: actionTypes.SET_PRODUCTS,
                products: [...products, {
                    ...response.data,
                    price: parseInt(response.data.price),
                    quantity: parseInt(response.data.quantity),
                    manufacturedDate: new Date(response.data.manufacturedDate)
                }]
            });
          setName('');
          setPrice(0);
          setQuantity(0);
          setDescription('');
          setImageUrl('');
        }
      }).finally(() => setLoading(false));

    }

    return (
        <Box>
            <Navbar/>
            <Stack style={{paddingTop: '75px'}} maxWidth="sm" spacing={2} sx={{ m: '2rem auto', textAlign: 'left' }} id="addMobileBody">
                <h2 style={{ padding: '0rem 0.6rem' }}>Add a new Product</h2>
                <TextField id='mobileName' label="Product Name" placeholder="Enter Name" error={nameError} type="text" value={name} onChange={(e)=>setName(e.target.value)} style={{margin : '10px'}} />
                <TextField id='mobilePrice' label="Price" placeholder="Enter Price" error={priceError} type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{margin : '10px'}}/>
                <TextField id='mobileDescription' label="Description" placeholder="Enter Description" error={descriptionError} multiline={true} type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{margin : '10px'}}/>
                <TextField id='mobileImageUrl' label="Image URL" placeholder="Enter Image URL" error={imageUrlError} type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{margin : '10px'}}/>
                <TextField id='mobileQuantity' label="Quantity" placeholder="Enter Quantity" error={quantityError} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{margin : '10px'}}/>
                <LoadingButton 
                  id = 'addMobileButton' 
                  variant = 'contained' 
                  onClick = {onSubmit} 
                  loading={loading}
                  loadingIndicator="Adding...">
                  ADD
                </LoadingButton>
            </Stack>
        </Box>
    )
}

export default AddProduct;