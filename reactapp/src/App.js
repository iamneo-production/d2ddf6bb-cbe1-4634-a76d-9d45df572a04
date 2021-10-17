import React, { useEffect } from 'react';
import './App.css';
import { useStateValue } from './utils/StateProvider';
import { actionTypes, openSnackbar } from "./utils/Reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup'
import Cart from './pages/user/Cart';
import OrderPreview from './pages/user/OrderPreview';
import Orders from './pages/user/Orders'
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import AllOrders from './pages/admin/AllOrders';
import EditProduct from './pages/admin/EditProduct';
import Product from './pages/user/Product';
import DashBoard from './pages/user/DashBoard';
import { loadAuthorizationHeaderFromStorage, ApiClient } from './utils/ApiClient';
import { Snackbar, Alert } from '@mui/material';

function App() {

  const [{user, userType, snackbar}, dispatch] = useStateValue();
  
  // run only during mount
  useEffect(() => {
    loadAuthorizationHeaderFromStorage();
    // http error handler
    ApiClient.interceptors.response.use((response) => response, (error) => {
      let message = 'There seems to be some internet connectivity issues!';
      
      if (error.response) {
        if (error.response.headers['error-message']) {
          message = error.response.headers['error-message'];
        }
        else {
          message = 'There was some unknown internal error. Please try again later.';
        }
      }

      dispatch(openSnackbar(message, 'error'));
      
      throw error;
    });
  }, []);
  
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('USER', JSON.stringify({
        user:`${user}`,
        userType: `${userType}`
      }));
    }else{
      AsyncStorage.getItem('USER').then((value) => {
        if (value) {
          value = JSON.parse(value)
          dispatch({
            type: actionTypes.SET_USER,
            user: value.user,
            userType: value.userType
          })
          console.log(value)
        }
      });
    }
  }, [user]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({
      type: actionTypes.SET_SNACKBAR,
      snackbar: { ...snackbar, open: false }
    });
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Switch>
            <Route exact path = "/signup">
              <Signup/>
            </Route>
            <Route path="/">
              <Login/>
            </Route>
          </Switch>
        ):(
          <>
          {
            userType === 'user' ? (
              <>
                <Switch>
                  <Route path="/cart">
                    <Cart/>
                  </Route>
                  <Route path="/preview">
                    <OrderPreview/>
                  </Route>
                  <Route path="/orders">
                    <Orders/>
                  </Route>
                  <Route path="/product/:productId">
                    <Product />
                  </Route>
                  <Route path="/home">
                    <DashBoard/>
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                </Switch>  
              </>
            ) : (
              <>
                <Switch>
                  <Route path="/addProduct">
                    <AddProduct/>
                  </Route>
                  <Route path="/editProduct/:productId">
                    <EditProduct/>
                  </Route>
                  <Route path="/admin/orders">
                    <AllOrders/>
                  </Route>
                  <Route path="/admin">
                    <AdminHome/>
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/admin" />
                  </Route>
                  <Route exact path="/home">
                    <Redirect to="/admin" />
                  </Route>
                </Switch>
              </>
            )
          }  
          </>        
        )}    
      </Router>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar.open}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
        key={'bottomright'}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.type} variant="filled" elevation={6} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}


export default App;
