import Button from "react-bootstrap/esm/Button";
import { Helmet } from "react-helmet-async";
import {Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"

export default function SigninScreen() {
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/'

    return (
    <Container className="small-container">

        <Helmet>
            <title>Logga In</title>
        </Helmet>
        <h1 className="my-3">Logga In</h1>
        <Form>
        <Form.Group className="mb-3" controllid="email">

            <Form.Label>Email</Form.Label>
            <Form.Control type="email"required />
        </Form.Group>

        <Form.Group className="mb-3" controllid="password">

            <Form.Label>Lösenord</Form.Label>
            <Form.Control type="password"required />
        </Form.Group>
        <div className="mb-3">
            <Button type="submit">Logga In</Button>
        </div>
        <div className="mb-3">
            Ny Kund? {' '}
            <Link to={`/signup?redirect=${redirect}`}>Skapa Konto</Link>
        </div>


        </Form>
    </Container>
    )
}
