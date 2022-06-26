
import { BrowserRouter, Link, Route, Routes} from "react-router-dom"
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import {LinkContainer} from "react-router-bootstrap"
import Badge from "react-bootstrap/esm/Badge";
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";


function App() {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state
  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
  }

  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <header >
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
            <Navbar.Brand>Jonas nätbutik</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto  w-100  justify-content-start">
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
                    Sign In
                    </Link>
                   )}

                    </Nav>
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
      </Routes>
    </Container>
    </main>
    <footer>
      <div className="text-center bg-light">All rights reserved to Ⓒ Jonas_Schwartz@hotmail.com</div>
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
