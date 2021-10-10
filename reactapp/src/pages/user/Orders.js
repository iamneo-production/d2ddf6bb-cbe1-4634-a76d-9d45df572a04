import Navbar from "../../components/Navbar";
import Datatable from "../../components/Datatable";
import styled from 'styled-components';

const Title = styled.h2`
    margin-top: 10px;
`

function Orders() {
    return (
        <div>
            <Navbar/>
            <Title>Your Orders</Title>   
            <br/>
            <Datatable type="orders" id="mobileOrderBody"/>         
        </div>
    )
}

export default Orders;