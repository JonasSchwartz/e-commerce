
import { BrowserRouter, Link, Route, Routes} from "react-router-dom"
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Container from "react-bootstrap/Container"
import {LinkContainer} from "react-router-bootstrap"
import Badge from "react-bootstrap/esm/Badge";
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignUpScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/orderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

function App() {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state
  
  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
  }

  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <ToastContainer position="top-center" limit={1} />
      <header >
        <Navbar bg="dark" variant="dark" expand="lg" >
          <Container>
            <LinkContainer to="/">
            <Navbar.Brand>Jonas nätbutik</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Kundvagn
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="success">
                              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}

                      </Link>
                   {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>Användare</NavDropdown.Item>

                        </LinkContainer>
                        <LinkContainer to="/orderhistory">
                          <NavDropdown.Item>Orderhistorik</NavDropdown.Item>

                        </LinkContainer>
                        <LinkContainer to="/contactscreen">
                          <NavDropdown.Item>Kontakta oss</NavDropdown.Item>

                        </LinkContainer>



                      {/* <NavDropdown.Divider/> */}
                      <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                      
                      >
                        Logga Ut
                      </Link>
                      

                      
                    </NavDropdown>
                   ):(
                    <Link className="nav-link" to="/signin">
                    Logga In
                    </Link>
                   )}

                    </Nav>
                    </Navbar.Collapse>
          </Container>
        </Navbar>
        
      </header>

    <main>
    <Container className="mt-3">
      <Routes>
        <Route path="/product/:slug" element={< ProductScreen />} />
        <Route path="/cart" element={<CartScreen/>} />
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/signin" element={<SigninScreen/>} />
        <Route path="/signup" element={<SignUpScreen/>} />
        <Route path="/payment" element={<PaymentMethodScreen/>} />
        <Route path="/placeorder" element={<PlaceOrderScreen/>} />
        <Route path="/order/:id" element={<OrderScreen/>}></Route>
        <Route path="/shipping" element={<ShippingAddressScreen/>}></Route>
        <Route path="/orderhistory" element={<OrderHistoryScreen/>}></Route>
      </Routes>
    </Container>
    </main>
    <footer>
      <div className="text-center bg-light"> Ⓒ Jonas Schwartz</div>
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
