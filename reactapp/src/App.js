import React, { useEffect } from 'react';
import './App.css';
import { useStateValue } from './utils/StateProvider';
import { actionTypes } from "./utils/Reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup'
import Cart from './pages/user/Cart';
import OrderPreview from './pages/user/OrderPreview';
import Orders from './pages/user/Orders'
import UserHome from './pages/user/UserHome';
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import AllOrders from './pages/admin/AllOrders';
import EditProduct from './pages/admin/EditProduct';
import Product from './pages/user/Product';
import SidebarDemo from './pages/SideBarDemo';
import { loadAuthorizationHeaderFromStorage } from './utils/ApiClient';

function App() {

  const [{user, userType}, dispatch] = useStateValue();
  
  loadAuthorizationHeaderFromStorage();

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
                  <Route path="/sidebar">
                    <SidebarDemo />
                  </Route>
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
                    <UserHome/>
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                </Switch>  
              </>
            ) : (
              <>
                <Switch>
                  <Route path="/addproduct">
                    <AddProduct/>
                  </Route>
                  <Route path="/editproduct">
                    <EditProduct/>
                  </Route>
                  <Route path="/adminorders">
                    <AllOrders/>
                  </Route>
                  <Route path="/admin">
                    <AdminHome/>
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/admin" />
                  </Route>
                </Switch>
              </>
            )
          }  
          </>        
        )}    
      </Router>
    </div>
  );
}


export default App;
