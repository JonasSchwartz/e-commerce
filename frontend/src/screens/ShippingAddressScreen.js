import React, { useContext, useEffect, useState } from 'react'
import {Helmet} from "react-helmet-async"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen() {
const navigate = useNavigate()
const {state, dispatch: ctxDispatch} = useContext(Store);
const {
    userInfo,
    cart:{shippingAddress},
} = state;

const [fullName, setFullName] = useState(shippingAddress.fullName || '')
const [address, setAddress] = useState(shippingAddress.address || '')
const [city, setCity] = useState(shippingAddress.city || '')
const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
const [country, setCountry] = useState(shippingAddress.country || '')

useEffect(() =>{
    if(!userInfo) {
        navigate('/signin')
    }
},[userInfo,navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            }
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        navigate('/payment')
    }

  return <div>
    <Helmet>
        <title>Shipping Adress</title>
    </Helmet>

    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className=' small-container'>


    
    <h1 className='my-3'>Leveransadress</h1>

    <Form onSubmit={submitHandler}>
    <Form.Group className="mb-3" controlId="Fullname">
    <Form.Label>Full Name</Form.Label>
    <Form.Control
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    required
    />

    </Form.Group>

    <Form.Group className="mb-3" controlId="Fullname">
    <Form.Label>adress</Form.Label>
    <Form.Control
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    required
    />

    </Form.Group>
    
    <Form.Group className="mb-3" controlId="Fullname">
    <Form.Label>stad</Form.Label>
    <Form.Control
    value={city}
    onChange={(e) => setCity(e.target.value)}
    required
    />

    </Form.Group>
    <Form.Group className="mb-3" controlId="Fullname">
    <Form.Label>postalcode</Form.Label>
    <Form.Control
    value={postalCode}
    onChange={(e) => setPostalCode(e.target.value)}
    required
    />

    </Form.Group>

    <Form.Group className="mb-3" controlId="Fullname">
    <Form.Label>Country</Form.Label>
    <Form.Control
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    required
    />

    </Form.Group>

    <Form.Group>
        <div className='mb-3'>
            <Button variant="primary" type="submit">
                Continue
            </Button>
        </div>
    </Form.Group>

    </Form>
</div>
  </div>
    
  
}
