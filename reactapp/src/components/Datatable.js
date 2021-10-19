import { useState, useEffect } from 'react';
import {default as Table} from 'react-data-table-component';
import styled from 'styled-components';
import { useStateValue } from "../utils/StateProvider";
import { MdRemove, MdAdd, MdDelete, MdDone, MdBolt } from "react-icons/md";
import { FaBolt } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import { createTheme } from '@mui/material/styles';
import { ApiClient, doUrlEncodedRequest } from '../utils/ApiClient';
import { displayRazorpay } from '../utils/Razorpay';
import { openSnackbar } from "../utils/Reducer";
import { useHistory } from 'react-router-dom';


const customStyles = {
    table: {
		style: { 
            borderStyle: 'solid',
            borderWidth: '1px',
		},
	},
    headRow: {
		style: {
			backgroundColor: '#00BFA6',
			minHeight: '52px',
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
		}
	},
};

const Container = styled.div`
    width: 60%;
    margin: 0 auto;
`
const ExpanderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Right = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    justify-content: flex-start;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;    
    flex-direction: column;
    text-align: left;
`
const Title = styled.p`
    font-size: 20px;
    font-weight: 700;
`
const Detail = styled.p`
    font-size: 16px;
    font-weight: 500;
`
const ComponentImg = styled.img`
    height: 200px;
    width: auto;
    text-align: center;
`
const ButtonContainer = styled.div`
    margin: 2px;
`
const theme = createTheme({
    palette: {
      primary: {
        main: '#B1D8B7',
        darker: '#00BFA6',
      },
    },
});

function Datatable({type, id}) {

    const [{userType}, dispatch] = useStateValue();
    const history = useHistory();

    const buyNow = (product) => {
        ApiClient.post(`/placeOrder/${product.productId}`, {
            productName: product.productName,
            quantity: product.quantity ? (product.quantity) : (1),
            price: product.price
        }).then(response => {
            if (response.data) {
                displayRazorpay(response.data, product.price).then(() => {
                    dispatch(openSnackbar(`The payment for ${product.productName} has been processed.`, 'success'));
                    history.push('/orders')
                }).catch(() => {
                    dispatch(openSnackbar(`There was an error in processing the payment. Any amount deducted will be refunded within 4 days.`, 'error'));
                });
            }
        });
        deleteCartItem(product.cartItemId);
    }
    
    const buyAllNow = () => {
        var totalPrice = 0
        var responseData
        cartData.forEach((product, index) => {
            totalPrice = parseInt(totalPrice) + parseInt(product.price)
            responseData = product
        })

        if(totalPrice !== 0){
            totalPrice = totalPrice * 100
            ApiClient.post(`/saveOrder`).then(response => {
                displayRazorpay(responseData, totalPrice).then(() => {
                    dispatch(openSnackbar(`The payment has been processed.`, 'success'));
                }).catch(() => {
                    dispatch(openSnackbar(`There was an error in processing the payment. Any amount deducted will be refunded within 4 days.`, 'error'));
                });
            }).finally(() => {
                cartData.forEach(product => {
                    deleteCartItem(product.cartItemId)
                    getCartData()
                    history.push('/orders')
                })
            })
        }else{
            buyAllNow()
        }      
    }

    const cartHeaders = [
        {
            name: 'Product Name',
            selector: row => row.productName,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true, 
        },
    ];

    const ordersHeaders = [
        {
            name: 'Product Name',
            selector: row => row.productName,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
    ];

    const adminOrdersHeaders = [
        {
            name: 'Order ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'User ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Mobile',
            selector: row => row.name,
            sortable: true, 
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true, 
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true, 
        },
    ];

    
    const [cartData, setCartData]  = useState([]);
    const [ordersData, setOrdersData]  = useState([]);
    const [adminOrdersData, setAdminOrdersData] = useState([]);

    const CartDetails = ({ data }) => 
    <pre>
        <ExpanderContainer>
            <Left>
                
            </Left>
            <Right>
                <Wrapper>
                    <Title>{data.productName}</Title>
                    <Detail>Price: &#8377; {data.price}</Detail>
                    <Detail>Quantity: 
                        <IconButton color="primary" style={{'margin-right': '7px'}} onClick={() => handleClick('remove', data)}>
                            <MdRemove/>
                        </IconButton> 
                        {data.quantity} 
                        <IconButton color="primary" style={{'margin-left': '7px'}} onClick={() => handleClick('add', data)} >
                            <MdAdd/>
                        </IconButton>
                    </Detail>
                    <Detail>Total Price: &#8377; {parseInt(data.price.replace(/[^0-9]/g, '')) * parseInt(data.quantity)}</Detail>
                    <ButtonContainer>
                        <Button 
                            style={{"margin-top":"10px", "margin-right":"10px", "padding": "7px 15px", "width": "fit-content"}} 
                            color="primary" 
                            variant="contained"
                            startIcon={<FaBolt />}
                            onClick={() => buyNow(data)}
                        >
                            Buy Now
                        </Button>
                        <Button 
                            style={{"margin-top":"10px", "padding": "7px 15px", "width": "fit-content"}} 
                            color="error" 
                            variant="outlined"
                            startIcon={<MdDelete />}
                            onClick={() => deleteCartItem(data.cartItemId)}
                        >
                            Remove Item
                        </Button>
                    </ButtonContainer>
                </Wrapper>
            </Right>
            
        </ExpanderContainer>
    </pre>;

    const OrderDetails = ({ data }) => 
    <pre>
        <ExpanderContainer>
            <Left>
                <ComponentImg src={data.url}/>
            </Left>
            <Right>
                <Wrapper>
                    <Title>{data.productName}</Title>
                    <Detail>Price: &#8377; {data.price}</Detail>
                    <Detail>Quantity: {data.quantity}
                    </Detail>
                    <Detail>Ordered on: {new Date(data.orderedDate).toDateString()}</Detail>
                    <Detail>Total Price: &#8377; {parseInt(data.price.replace(/[^0-9]/g, '')) * parseInt(data.quantity) }</Detail>
                    <Detail>Status: {data.status}</Detail>
                </Wrapper>
            </Right>

        </ExpanderContainer>
    </pre>;


    const getCartData = () => {
        ApiClient.get('/cart').then(response => {
            if(response.data.length !== 0){
                if(response.data.length !== cartData.length || response.data[0].quantity !== cartData[0].quantity){
                    setCartData(response.data)
                }
            }
        });
    }

    const getOrdersData = () => {
        ApiClient.get('/orders').then(response => {
            if(response.data.length !== ordersData.length){
                setOrdersData(response.data)
                console.log(response.data)
            }
        });
    }

    const getAdminOrdersData = () => {
        ApiClient.get('/orders').then(response => {
            console.log(response)
            if(response.data.length !== adminOrdersData.length){
                setAdminOrdersData(response.data)
                console.log(response.data)
            }
        });
    }

    const deleteCartItem = (id) => {
        ApiClient.delete(`/cart/${id}`).then(response => {
            getCartData()
            dispatch(openSnackbar(`Item removed`, 'success'));
        });
    }

    const deleteAllCartItems = () => {
        if(cartData.length !== 0){
            cartData.forEach(item => {
                ApiClient.delete(`/cart/${item.cartItemId}`)
            })
            if (cartData.length === 0){
                getCartData()
                dispatch(openSnackbar(`All Items removed`, 'success'));
            }else{
                deleteAllCartItems()
            }
        }
    }

    const handleClick =  (type, product)  => {
        var currQuantity = product.quantity
        if(type === 'add'){
            ApiClient(doUrlEncodedRequest('POST', { quantity: currQuantity + 1 }, `/home/${product.productId}`)).then(response => {
                if (response.data) {
                    dispatch(openSnackbar(`Item added`, 'success'));
                }
            });
            deleteCartItem(product.cartItemId)
            getCartData()
        }else{
            if(currQuantity === 1){
                deleteCartItem(product.cartItemId)
                getCartData()
            }else{
                ApiClient(doUrlEncodedRequest('POST', { quantity: currQuantity - 1 }, `/home/${product.productId}`)).then(response => {
                    if (response.data) {
                        dispatch(openSnackbar(`Item removed`, 'success'));
                    }
                });
                deleteCartItem(product.cartItemId)
                getCartData()
            }
        }
    }

    useEffect(() => {
        getCartData()
        getOrdersData()
        getAdminOrdersData()
    }, [cartData, ordersData, adminOrdersData])

    return (
        <Container id={id}>
        {
            userType === 'user' ? ( 
                type === 'orders' ? (
                    ordersData.length === 0 ? (
                        <p>Orders is empty</p>
                    ) : (
                        <Table
                        columns={ordersHeaders}
                        data={ordersData}
                        expandableRows
                        expandableRowsComponent={OrderDetails}
                        customStyles={customStyles}
                        pagination
                        />
                    )
                    
                ) : (
                    cartData.length === 0 ? (
                        <p>Cart is empty</p>
                    ) : (
                        <>
                            <Table
                                columns={cartHeaders}
                                data={cartData}
                                expandableRows
                                expandableRowsComponent={CartDetails}
                                customStyles={customStyles}
                            />
                            <ButtonContainer>
                                <Button 
                                    style={{height: '40px', marginTop: '10px'}} 
                                    variant="contained" 
                                    theme={theme} 
                                    startIcon={<MdDone />}
                                    onClick={() => buyAllNow()}
                                >
                                    Buy All
                                </Button>
                                <Button 
                                    style={{height: '42px', marginLeft: '10px', marginTop: '10px'}} 
                                    color="error" 
                                    variant="outlined"
                                    startIcon={<MdDelete />}
                                    onClick={() => deleteAllCartItems()}
                                >
                                    Remove All
                                </Button>
                            </ButtonContainer>
                        </> 
                    )
                )
            )
            : ( 
                // <Table
                //     columns={adminOrdersHeaders}
                //     data={adminOrdersData}
                //     customStyles={customStyles}
                //     pagination
                // /> 
                <></>
            )
        }
        </Container>
    );
};

export default Datatable