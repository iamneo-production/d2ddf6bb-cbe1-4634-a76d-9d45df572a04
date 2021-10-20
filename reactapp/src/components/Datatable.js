import { useState, useEffect } from 'react';
import {default as Table} from 'react-data-table-component';
import styled from 'styled-components';
import { useStateValue } from "../utils/StateProvider";
import { MdRemove, MdAdd, MdDelete, MdDone, MdBolt } from "react-icons/md";
import { FaBolt } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton';
import { createTheme } from '@mui/material/styles';
import { ApiClient, doUrlEncodedRequest } from '../utils/ApiClient';
import { displayRazorpay } from '../utils/Razorpay';
import { openSnackbar } from "../utils/Reducer";
import { useHistory } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import AuditLog from './AuditLog';


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
    margin: 0 auto;
    @media(max-width:780px){
        width: 100%;
    }
`
const ExpanderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
    @media(max-width: 780px){
        flex-direction: column;
    }
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

function Datatable({type, id, userId}) {

    const [{userType}, dispatch] = useStateValue();
    const history = useHistory();
    const [logsData, setLogsData]  = useState([]);
    const [cartData, setCartData]  = useState([]);
    const [ordersData, setOrdersData]  = useState([]);
    const [adminOrdersData, setAdminOrdersData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [buyAllLoading, setBuyAllLoading] = useState(false);
    const [removeAllLoading, setRemoveAllLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

                const index = cartData.findIndex(x => x.cartItemId === product.cartItemId);
                cartData.splice(index, 1);
                setCartData([...cartData]);
            }
        });
    }
    
    const buyAllNow = () => {
        setBuyAllLoading(true);
        ApiClient.post('/saveOrder').then(() => {
            setCartData([]);
            dispatch(openSnackbar(`Orders for all cart items have been created.`, 'success'));
            history.push('/orders');
        }).finally(() => setBuyAllLoading(false));
    }
    

    const cartHeaders = [
        {
            name: 'Product Name',
            selector: row => row.productName,
            sortable: true,
            grow: 3,
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
            grow: 3,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Payment',
            selector: row => {
                if(row.paid){
                    return "Completed"
                }else{
                    return "Pending"
                }
            },                
            sortable: true,
        },
    ];

    const adminOrdersHeaders = [
        {
            name: 'Order ID',
            selector: row => row.orderId,
            sortable: true,
        },
        {
            name: 'User ID',
            selector: row => row.userId,
            sortable: true,
        },
        {
            name: 'Mobile Name',
            selector: row => row.productName,
            sortable: true, 
            grow: 4,
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
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true, 
        },
        {
            name: 'Payment',
            selector: row => {
                if(row.paid){
                    return "Completed"
                }else{
                    return "Pending"
                }
            },                
            sortable: true,
        },
    ];

    const adminUserLogHeaders = [
        {
            name: 'Occured on',
            selector: row => row.createdAt,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => row.action
        }
    ];

    const adminUsersHeaders = [
        {
            name: 'User ID',
            selector: row => parseInt(row.id),
            sortable: true
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Mobile Number',
            selector: row => row.mobileNumber,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'Audit Log',
            button: true,
            cell: row => (
                <Button size="small" onClick={() => {
                    setSelectedUser(row);
                }}>
                    View
                </Button>
            )
        }
    ];

    const CartDetails = ({ data }) => 
    <pre>
        <ExpanderContainer>
            <Left>
                <ComponentImg src={data.imageUrl}/>
            </Left>
            <Right>
                <Wrapper>
                    <Title>{data.productName}</Title>
                    <Detail>Price: &#8377; {data.price}</Detail>
                    <Detail>Quantity: 
                        <IconButton color="primary" style={{marginRight: '7px'}} onClick={() => handleClick('remove', data)}>
                            <MdRemove/>
                        </IconButton> 
                        {data.quantity} 
                        <IconButton color="primary" style={{marginLeft: '7px'}} onClick={() => handleClick('add', data)} >
                            <MdAdd/>
                        </IconButton>
                    </Detail>
                    <Detail>Total Price: &#8377; {parseInt(data.price.replace(/[^0-9]/g, '')) * parseInt(data.quantity)}</Detail>
                    <ButtonContainer>
                        <Button 
                            style={{marginTop:"10px", marginRight:"10px", "padding": "7px 15px", "width": "fit-content"}} 
                            color="primary" 
                            variant="contained"
                            startIcon={<FaBolt />}
                            onClick={() => buyNow(data)}
                        >
                            Buy Now
                        </Button>
                        <Button 
                            style={{marginTop:"10px", "padding": "7px 15px", "width": "fit-content"}} 
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
                <ComponentImg src={data.imageUrl}/>
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
                    <Detail>Payment: {data.paid ? "Completed" : "Pending" }</Detail>
                </Wrapper>
            </Right>

        </ExpanderContainer>
    </pre>;

    const getAdminUsersData = () => {
        ApiClient.get('/admin/users').then(response => {
            if (response.data.length !== 0) {
                if (response.data.length !== usersData.length) {
                    setUsersData(response.data);
                }
            }
        }).finally(() => setLoaded(true));
    }

    const getCartData = () => {
        ApiClient.get('/cart').then(response => {
            if(response.data.length !== 0){                
                if(response.data.length !== cartData.length || response.data[0].quantity !== cartData[0].quantity){
                    setCartData(response.data)
                }
            }
        }).finally(() => setLoaded(true));
    }

    const getOrdersData = () => {
        ApiClient.get('/orders').then(response => {
            if(response.data.length !== ordersData.length){
                setOrdersData(response.data)
            }
        }).finally(() => setLoaded(true));
    }

    const getAdminOrdersData = () => {
        ApiClient.get('/admin/orders').then(response => {
            if(response.data.length !== adminOrdersData.length){
                setAdminOrdersData(response.data)
            }
        }).finally(() => setLoaded(true));
    }

    const getLogsData = () => {
        ApiClient.get(`/admin/users/${userId}/logs`).then(response => {
            if(response.data.length !== logsData.length){
                setLogsData(response.data)
            }
        }).finally(() => setLoaded(true));
    }

    const deleteCartItem = (id) => {
        ApiClient.delete(`/cart/${id}`).then(response => {
            const index = cartData.findIndex(x => x.cartItemId === id);
            cartData.splice(index, 1);
            setCartData([...cartData]);
            dispatch(openSnackbar(`Item removed.`, 'success'));
        });
    }

    const deleteAllCartItems = () => {
        if(cartData.length !== 0) {
            setRemoveAllLoading(true);
            cartData.forEach(item => {
                ApiClient.delete(`/cart/${item.cartItemId}`)
            })
            dispatch(openSnackbar(`All Items removed.`, 'success'));
            setCartData([]);
            history.push('/');
        }
    }

    const handleClick =  (type, product)  => {
        if(type === 'add'){
            ApiClient(doUrlEncodedRequest('POST', { quantity: 1 }, `/home/${product.productId}`)).then(response => {
                if (response.data) {
                    dispatch(openSnackbar(`Item added.`, 'success'));
                    const index = cartData.findIndex(x => x.cartItemId === product.cartItemId);
                    cartData[index].quantity += 1;
                    setCartData([...cartData]);
                }
            });
        }
        else{
            if (product.quantity === 1){
                ApiClient.delete(`/cart/${product.cartItemId}`).then(response => {
                    const index = cartData.findIndex(x => x.cartItemId === product.cartItemId);
                    cartData.splice(index, 1);
                    setCartData([...cartData]);
                    dispatch(openSnackbar(`Item removed.`, 'success'));
                });
            }
            else {                
                ApiClient(doUrlEncodedRequest('POST', { quantity: -1 }, `/home/${product.productId}`)).then(response => {
                    if (response.data) {
                        const index = cartData.findIndex(x => x.cartItemId === product.cartItemId);
                        cartData[index] = {
                            ...cartData[index],
                            quantity: cartData[index].quantity - 1
                        }
                        setCartData([...cartData]);            
                        dispatch(openSnackbar(`Item removed.`, 'success'));            
                    }
                });
            }
        }
    }

    useEffect(() => {
        setLoaded(false);
        if(userType === 'user') {            
            getCartData()
            getOrdersData()
        }
        else{
            if (type === 'users') {
                getAdminUsersData();
            }
            else if (type === 'logs') {
                getLogsData();
            }
            else {
                getAdminOrdersData();
            }
        }        
    }, [userId])

    return (
        <Container id={id} style={{ width: type === 'logs' ? '100%' : '70%' }}>
        {
            loaded ? (
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
                                    <LoadingButton loading={buyAllLoading} loadingIndicator="Buying..."
                                        style={{height: '40px', marginTop: '10px'}} 
                                        variant="contained" 
                                        theme={theme} 
                                        startIcon={<MdDone />}
                                        onClick={() => buyAllNow()}
                                    >
                                        Buy All
                                    </LoadingButton>
                                    <LoadingButton loading={removeAllLoading} loadingIndicator="Removing..."
                                        style={{height: '42px', marginLeft: '10px', marginTop: '10px'}} 
                                        color="error" 
                                        variant="outlined"
                                        startIcon={<MdDelete />}
                                        onClick={() => deleteAllCartItems()}
                                    >
                                        Remove All
                                    </LoadingButton>
                                </ButtonContainer>
                            </> 
                        )
                    )
                )
                : (
                    type === 'orders' ?
                    ( 
                        adminOrdersData.length === 0 ? (
                            <p>Orders is empty</p>
                        ) : (
                            <Table
                                columns={adminOrdersHeaders}
                                data={adminOrdersData}
                                customStyles={customStyles}
                                pagination
                            /> 
                        ) 
                    ) : type === 'users' ? (
                        usersData.length === 0 ? (
                            <p>Users are empty</p>
                        ) : (
                            <>
                                <Table
                                    columns={adminUsersHeaders}
                                    data={usersData}
                                    customStyles={customStyles}
                                    pagination
                                /> 
                                <AuditLog user={selectedUser} />
                            </>
                        ) 
                    ) : (
                        logsData.length === 0 ? (
                            <p>No actions taken so far.</p>
                        ) : (
                            <>
                                <Table
                                    columns={adminUserLogHeaders}
                                    data={logsData}
                                    customStyles={customStyles}
                                    pagination
                                /> 
                            </>
                        )
                    )
                )
            ) : (
                <Skeleton variant="rectangular" height={400} animation="wave" /> 
            )
        }
        </Container>
    );
};

export default Datatable;