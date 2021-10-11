import {default as Table} from 'react-data-table-component';
import styled from 'styled-components';
import { useStateValue } from "../utils/StateProvider";
import { MdRemove, MdAdd, MdDelete, MdDone, MdBolt } from "react-icons/md";
import { FaBolt } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import { createTheme } from '@mui/material/styles';

const ordersHeaders = [
    {
        name: 'Product Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
    },
];

const cartHeaders = [
    {
        name: 'Product Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Price',
        selector: row => row.price,
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

const ordersData = [
    {
        id: 1,
        name: 'Realme 8i',
        price: '12,999',
        quantity: '2',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17577-157-1.jpg'
    },
    {
        id: 2,
        name: 'Oppo F19s',
        price: '19,990',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18317-258-1.jpg'
    },
    {
        id: 3,
        name: 'Vivo Y21',
        price: '13,990',
        quantity: '1',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18289-249-1.jpg'
    },
    {
        id: 4,
        name: 'Vivo X70 Pro Plus',
        price: '79,990',
        quantity: '5',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17553-286-1.jpg'
    },
    {
        id: 5,
        name: 'Apple iPhone 13',
        price: '79,900',
        quantity: '3',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/16999-274-1.jpg'
    },
    {
        id: 6,
        name: 'Samsung Galaxy F42',
        price: '17,999',
        quantity: '2',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17991-149-1.jpg'
    },
    {
        id: 7,
        name: 'Realme GT 5G',
        price: '27,775',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17361-2-1.jpg'
    },
    {
        id: 8,
        name: 'Realme 8s 5G',
        price: '17,999',
        quantity: '10',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18225-100-1.jpg'
    },
    {
        id: 9,
        name: 'Realme 8i',
        price: '12,999',
        quantity: '7',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17577-157-1.jpg'
    },
    {
        id: 10,
        name: 'Oppo F19s',
        price: '19,990',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18317-258-1.jpg'
    },
    {
        id: 11,
        name: 'Vivo X70 Pro',
        price: '46,990',
        quantity: '2',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18229-171-1.jpg'
    },
    {
        id: 12,
        name: 'Samsung Galaxy A52s 5G',
        price: '35,999',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18164-92-1.jpg'
    },
    {
        id: 13,
        name: 'Samsung Galaxy M32 5G',
        price: '16,999',
        quantity: '6',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18158-170-1.jpg'
    },
]

const cartData = [
    {
        id: 1,
        name: 'Realme 8i',
        price: '12,999',
        quantity: '2',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17577-157-1.jpg'
    },
    {
        id: 2,
        name: 'Oppo F19s',
        price: '19,990',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18317-258-1.jpg'
    },
    {
        id: 3,
        name: 'Vivo Y21',
        price: '13,990',
        quantity: '1',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18289-249-1.jpg'
    },
    {
        id: 4,
        name: 'Vivo X70 Pro Plus',
        price: '79,990',
        quantity: '5',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17553-286-1.jpg'
    },
]

const adminOrdersData = [
    {
        id: 1,
        name: 'Realme 8i',
        price: '12,999',
        quantity: '2',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17577-157-1.jpg'
    },
    {
        id: 2,
        name: 'Oppo F19s',
        price: '19,990',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18317-258-1.jpg'
    },
    {
        id: 3,
        name: 'Vivo Y21',
        price: '13,990',
        quantity: '1',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18289-249-1.jpg'
    },
    {
        id: 4,
        name: 'Vivo X70 Pro Plus',
        price: '79,990',
        quantity: '5',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17553-286-1.jpg'
    },
    {
        id: 5,
        name: 'Apple iPhone 13',
        price: '79,900',
        quantity: '3',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/16999-274-1.jpg'
    },
    {
        id: 6,
        name: 'Samsung Galaxy F42',
        price: '17,999',
        quantity: '2',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17991-149-1.jpg'
    },
    {
        id: 7,
        name: 'Realme GT 5G',
        price: '27,775',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17361-2-1.jpg'
    },
    {
        id: 8,
        name: 'Realme 8s 5G',
        price: '17,999',
        quantity: '10',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18225-100-1.jpg'
    },
    {
        id: 9,
        name: 'Realme 8i',
        price: '12,999',
        quantity: '7',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/17577-157-1.jpg'
    },
    {
        id: 10,
        name: 'Oppo F19s',
        price: '19,990',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18317-258-1.jpg'
    },
    {
        id: 11,
        name: 'Vivo X70 Pro',
        price: '46,990',
        quantity: '2',
        status: 'delivered',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18229-171-1.jpg'
    },
    {
        id: 12,
        name: 'Samsung Galaxy A52s 5G',
        price: '35,999',
        quantity: '1',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18164-92-1.jpg'
    },
    {
        id: 13,
        name: 'Samsung Galaxy M32 5G',
        price: '16,999',
        quantity: '6',
        status: 'Shipped',
        url: 'https://assets.mspimages.in/c/tr:w-375,h-330,c-at_max/18158-170-1.jpg'
    }
]

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


const OrderDetails = ({ data }) => 
    <pre>
        <ExpanderContainer>
            <Left>
                <ComponentImg src={data.url}/>
            </Left>
            <Right>
                <Wrapper>
                    <Title>{data.name}</Title>
                    <Detail>Price: &#8377; {data.price}</Detail>
                    <Detail>Quantity:{data.quantity}
                    </Detail>
                    <Detail>Ordered on: {new Date().toDateString()}</Detail>
                    <Detail>Total Price: &#8377; {parseInt(data.price.replace(/[^0-9]/g, '')) * parseInt(data.quantity) + 100}</Detail>
                    <Detail>Status: {data.status}</Detail>
                </Wrapper>
            </Right>
            
        </ExpanderContainer>
    </pre>;
    
const CartDetails = ({ data }) => 
    <pre>
        <ExpanderContainer>
            <Left>
                <ComponentImg src={data.url}/>
            </Left>
            <Right>
                <Wrapper>
                    <Title>{data.name}</Title>
                    <Detail>Price: &#8377; {data.price}</Detail>
                    <Detail>Quantity: 
                        <IconButton color="primary" style={{'margin-right': '7px'}} onClick={() => handleClick('remove')}>
                            <MdRemove/>
                        </IconButton> 
                        {data.quantity} 
                        <IconButton color="primary" style={{'margin-left': '7px'}} onClick={() => handleClick('add')} >
                            <MdAdd/>
                        </IconButton>
                    </Detail>
                    <Detail>Total Price: &#8377; {parseInt(data.price.replace(/[^0-9]/g, '')) * parseInt(data.quantity) + 100}</Detail>
                    <ButtonContainer>
                        <Button 
                            style={{"margin-top":"10px", "margin-right":"10px", "padding": "7px 15px", "width": "fit-content"}} 
                            color="primary" 
                            variant="contained"
                            startIcon={<FaBolt />}
                            onClick={() => placeOrder()}
                        >
                            Buy Now
                        </Button>
                        <Button 
                            style={{"margin-top":"10px", "padding": "7px 15px", "width": "fit-content"}} 
                            color="error" 
                            variant="outlined"
                            startIcon={<MdDelete />}
                            onClick={() => removeItem(data.id)}
                        >
                            Remove Item
                        </Button>
                    </ButtonContainer>
                </Wrapper>
            </Right>
            
        </ExpanderContainer>
    </pre>;

function handleClick (type) {
    if(type === 'add'){
        alert('Item added.')
    }else{
        alert('Item removed.')
    }
}

function removeItem(id) {
    alert('Item No.'+id+' removed')
}

function placeOrder() {
    alert('Order placed')
}

function Datatable({type, id}) {

    const [{userType}, dispatch] = useStateValue();

    return (
        <Container id={id}>
        {
            userType === 'user' ? ( 
                type === 'orders' ? (
                    <Table
                        columns={ordersHeaders}
                        data={ordersData}
                        expandableRows
                        expandableRowsComponent={OrderDetails}
                        customStyles={customStyles}
                        pagination
                    />
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
                            variant="contained" 
                            theme={theme} 
                            startIcon={<MdDone />}
                            onClick={() => placeOrder()}
                        >
                            Place Order
                        </Button>
                    </ButtonContainer>
                    </> 
                )
            )
            : ( 
                <Table
                    columns={adminOrdersHeaders}
                    data={adminOrdersData}
                    customStyles={customStyles}
                    pagination
                /> 
            )
        }
        </Container>
    );
};

export default Datatable