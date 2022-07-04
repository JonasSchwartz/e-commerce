import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import Card from 'react-bootstrap/esm/Card';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox'
import MessageBox from "../components/MessageBox"
import { Store } from '../Store';
import { getError } from '../utils';



function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true, error: ''};
            case 'FETCH_SUCCESS':
                return{...state,loading:false, order: action.payload,error:''};
                case 'FETCH_FAIL':
                    return{...state,loading:false, error: action.payload}

                    default: return state;
    }
}

export default function OrderScreen() {
    const {state} = useContext(Store)
    const {userInfo} = state;

    const params = useParams();
    const {id: orderId} = params
    const navigate = useNavigate();

    const [{loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    } )


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({type: 'FETCH_REQUEST'})
                const { data } = await axios.get(`/api/orders/${orderId}`,{
                    headers: {authorization:`Bearer ${userInfo.token}`},
                });
                dispatch({type: 'FETCH_SUCCESS',payload: data});
            } catch (err) {
                dispatch({type:'FETCH_FAIL', payload: getError(err)});
            }

            }
        
        if(!userInfo) {
            return navigate('/login')
        }
        if(!order._id ||(order._id && order._id !== orderId)) {
            fetchOrder();
        }
    },[order, userInfo, orderId, navigate])

  return loading ? (
    
    <LoadingBox></LoadingBox>
    ):error ? (
       <MessageBox variant="danger>">{error}</MessageBox> 
    ):(
        <div>
           <Helmet>
            <title>Order {orderId}</title>
           </Helmet>
        <h1 className='my-3'>Order {orderId}</h1>
            <Row>
        <Col className="mb-3">
            <Card>
        <Card.Body>
            <Card.Title>Leverans</Card.Title>
            <Card.Text>
        <strong>Namn</strong> {order.shippingAddress.fullName} <br/>
        <strong>Adress</strong> {order.shippingAddress.address},
        {order.shippingAddress.city}, {order.shippingAddress.postalCode},
        {order.shippingAddress.country}
            </Card.Text>
        {order.isDelivered ? (
            <MessageBox variant="success">
                Skickad till {order.delieveredAt}
            </MessageBox>
        ) : (
            <MessageBox variant="danger">
                Ej Skickad
            </MessageBox>
        ) }

        
            
        </Card.Body>
        </Card>
            <Card className="mb-3">
                <Card.Body>

                    <Card.Title>Betalning</Card.Title>
                        <Card.Text>
                            <strong>Betalningsmetod</strong> {order.paymentMethod}
                        </Card.Text>
                    {order.isPaid ? (
                        <MessageBox variant="success">
                            betald: {order.paidAt}
                        </MessageBox>
                    ) : (
                        <MessageBox variant="danger">Ej Betald</MessageBox>
                    )}

                </Card.Body>
            </Card>

                        <Card className="mb-3">
                            <Card.Body className="">

                            <Card.Title>Produkter</Card.Title>
                            <ListGroup variant="flush">
                                {order.orderItems.map((item) => (
                            
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={3}>

                                    <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid rounded img-thumbnail"
                                    ></img>{' '}
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>

                                    </Col>
                                    <Col md={3}>
                                        <span>{item.quantity}</span>
                                    </Col>
                                    <Col md={3}>
                                    {item.price}kr
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                                ))}
                            </ListGroup>
                            </Card.Body>
                        </Card>



        </Col>


<Col md={4}>
    <Card className="mb-3">
             <Card.Body>
                
                <Card.Title>Sammanställning</Card.Title>
                    
                <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Produkter</Col>
                    <Col>{order.itemsPrice.toFixed(2)}Kr</Col>
                  </Row>
                </ListGroup.Item>



                                    <ListGroup.Item>

                                        <Row>
                                            <Col>Leverans</Col>
                                            <Col>{order.shippingPrice.toFixed(2)}kr</Col>
                                              </Row>
                                    </ListGroup.Item>     
                                            
                                    
                                    <ListGroup.Item>

                                    <Row>
                                <Col>Moms</Col>
                                <Col>{order.taxPrice.toFixed(2)}kr</Col>
                                </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>

<Row>
<Col><strong>Totalt</strong></Col>
<Col><strong>{order.totalPrice.toFixed(2)}kr</strong></Col>
</Row>
</ListGroup.Item>




                </ListGroup>
                </Card.Body>                       


    </Card>
</Col>


            </Row>

        </div>
    )

     
        
    
     
    
  
}
