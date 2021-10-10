import Navbar from "../../components/Navbar";
import Datatable from "../../components/Datatable";
import styled from 'styled-components';

const Title = styled.h2`
    margin-top: 10px;
`

function Cart() {
    return (
        <div>
            <Navbar/>
            <Title>Cart</Title>
            <br/>
            <Datatable type="cart" id="mobileCartBody" />
        </div>
    )
}

export default Cart;