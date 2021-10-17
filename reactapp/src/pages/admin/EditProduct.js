import Navbar from "../../components/Navbar";
import { Box, Stack, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useStateValue } from "../../utils/StateProvider";
import { ApiClient } from '../../utils/ApiClient';
import { actionTypes, openSnackbar } from '../../utils/Reducer';
import { useParams, useHistory } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

function EditProduct() {
    const { productId } = useParams();
    const history = useHistory();
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

    // set product
    const product = products.find(x => x.productId === productId) ?? {};

    useEffect(() => {
        if (!product.productId) {        
        dispatch(openSnackbar('This product does not seem to be available anymore!', 'error'));
        history.push('/');
        }
        else {
            setName(product.productName);
            setPrice(product.price);
            setQuantity(product.quantity);
            setDescription(product.description);
            setImageUrl(product.imageUrl);
        }
    }, [product]);

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
      ApiClient.post(`/admin/productEdit/${product.productId}`, {
        productName: name, price, imageUrl, description, quantity
      }).then(response => {
        if (response.data) {            
          // success
          dispatch(openSnackbar('Product edited successfully.', 'success'));
          const index = products.findIndex(x => x.productId === product.productId);
          products[index] = {
              ...products[index],
              productName: name,
              price,
              imageUrl,
              description,
              quantity
          }
          dispatch({
                type: actionTypes.SET_PRODUCTS,
                products
            });
            history.push('/');
        }
      }).finally(() => setLoading(false));

    }

    return (
        <Box>
            <Navbar/>
            <Stack maxWidth="sm" spacing={2} sx={{ m: '2rem auto', textAlign: 'left' }} id="editMobileBody">
                <h2 style={{ padding: '0rem 0.6rem' }}>Edit Product</h2>
                <TextField id='mobileName' label="Product Name" placeholder="Enter Name" error={nameError} type="text" value={name} onChange={(e)=>setName(e.target.value)} style={{margin : '10px'}} />
                <TextField id='mobilePrice' label="Price" placeholder="Enter Price" error={priceError} type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{margin : '10px'}}/>
                <TextField id='mobileDescription' label="Description" placeholder="Enter Description" error={descriptionError} multiline={true} type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{margin : '10px'}}/>
                <TextField id='mobileImageUrl' label="Image URL" placeholder="Enter Image URL" error={imageUrlError} type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{margin : '10px'}}/>
                <TextField id='mobileQuantity' label="Quantity" placeholder="Enter Quantity" error={quantityError} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{margin : '10px'}}/>
                <LoadingButton 
                  id = 'editMobileButton' 
                  variant = 'contained' 
                  onClick = {onSubmit} 
                  loading={loading}
                  loadingIndicator="Editing...">
                  EDIT
                </LoadingButton>
            </Stack>
        </Box>
    )
}

export default EditProduct;