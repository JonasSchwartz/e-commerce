import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup"
import {Link} from "react-router-dom"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function CartScreen () {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {cartItems},
    } = state;

    return (
        <div>
            <Helmet>
                <title>Kundvagn</title>
            </Helmet>
            <h1>Kundvagn</h1>

            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ?(
                    <MessageBox>
                        Kundvagnen är tom. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                    ):
                    (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid rounded img-thumbnail"
                                            
                                            ></img> {" "}
                                            
                                           <Link to={`/product/${item.slug}`}> {item.name}</Link>
                                            
                                        </Col>
                                        <Col md={3}>
                                        <Button variant="light" disabled={item.quantity === 1}>
                                            <i className="fas fa-minus-circle"></i>
                                        </Button> {" "}
                                        <span>{item.quantity}</span>{" "}
                                        <Button variant="light" disabled={item.quantity === 1}>
                                            <i className="fas fa-plus-circle"></i>
                                        </Button> {" "}
                                        </Col>
                                    
                                    
                                    </Row>
                                    <Col md={3}> {item.price} Sek {" "}
                                       <Button variant="light" disabled={item.quantity === 1}>
                                            <i className="fas fa-trash "></i>
                                        </Button> 

                                    </Col>
                                 
                                </ListGroup.Item>
                            ))}
                          </ListGroup>  
                    )
                 }
                        
                    
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>Totalt:</h3>
                            Total: ({cartItems.reduce((a,c) => a+c.quantity, 0)}{" "}
                            items) :  {" "}
                            {cartItems.reduce((a,c) => a+c.price * c.quantity, 0)} kr

                                </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                    type="button"
                                    variant="primary"
                                    disabled={cartItems.length === 0}
                                    >
                                        Till kassan
                                    </Button>
                                </div>
                            </ListGroup.Item>



                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}