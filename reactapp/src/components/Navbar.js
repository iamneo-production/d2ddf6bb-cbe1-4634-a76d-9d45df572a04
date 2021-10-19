import styled from 'styled-components';
import { useStateValue } from "../utils/StateProvider";
import { actionTypes, openSnackbar } from "../utils/Reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetAuthorizationHeader } from '../utils/ApiClient';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  width: 100%;
  background: #00BFA6;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 999999;
`;

const Wrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

function Navbar(){

  const [{userType}, dispatch] = useStateValue();
  const history = useHistory();

  return (
    <Container>
      <Wrapper id="userNavbar">
        <Left>
          <Logo>STORE.</Logo>
          {
            userType === 'user' ? (
              <>
                <MenuItem id='mobileHomeButton' onClick={() => history.push('/home')}>Home</MenuItem>
                <MenuItem id='mobileCartButton' onClick={() => history.push('/cart')}>Cart</MenuItem>
                <MenuItem id='mobileOrderButton' onClick={() => history.push('/orders')}>My Orders</MenuItem>
              </>
            ) : (
              <>
                <MenuItem id='adminProductButton' onClick={() => history.push('/admin')}>Products</MenuItem>
                <MenuItem id='adminOrderButton' onClick={() => history.push('/admin/orders')}>Orders</MenuItem>
                <MenuItem id='adminUserButton' onClick={() => history.push('/admin/users')}>Users</MenuItem>
              </>
            )
          }
        </Left>
        <Right>
          <MenuItem onClick={() => {
              resetAuthorizationHeader();
              
                if(userType === 'user'){
                  dispatch({
                    type: actionTypes.SET_USER,
                    user: null,
                    userType: null
                  })
                  AsyncStorage.clear()
                  history.push('/')
                }
                else{
                  dispatch({
                    type: actionTypes.SET_USER,
                    user: null,
                    userType: null
                  })
                  AsyncStorage.clear()
                  history.push('/')
                }

                dispatch(openSnackbar('Thank you for visiting!', 'success'));
            }} id="logoutButton">Logout</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};


export default Navbar;