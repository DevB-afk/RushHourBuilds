import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import Invoice from "../components/Invoice";

function Checkout({ cart, preTaxTotal, clearCart }) {
  const [orderData, setOrderData] = useState({
    fullName: "",
    email: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping",
  });

  const [invoiceVisible, setInvoiceVisible] = useState(false);

  const tax = preTaxTotal * 0.06;
  const finalTotal = preTaxTotal + tax;

  function handleChange(e) {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) return;
    setInvoiceVisible(true);
  }

  function handleNewOrder() {
    clearCart();
    setInvoiceVisible(false);
    setOrderData({
      fullName: "",
      email: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZip: "",
      paymentMethod: "Credit Card",
      shippingMethod: "Standard Shipping",
    });
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Checkout</h2>

      {cart.length === 0 && !invoiceVisible && (
        <Alert variant="warning">Your cart is empty. Add some items before checkout.</Alert>
      )}

      {!invoiceVisible && (
        <Row>
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Form onSubmit={handleCheckout}>
                  <h4 className="mb-3">Customer Information</h4>

                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={orderData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={orderData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <h5 className="mt-3">Billing Address</h5>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="billingAddress"
                          value={orderData.billingAddress}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="billingCity"
                          value={orderData.billingCity}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="billingState"
                          value={orderData.billingState}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>ZIP</Form.Label>
                        <Form.Control
                          type="text"
                          name="billingZip"
                          value={orderData.billingZip}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <h5 className="mt-3">Shipping Address</h5>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="shippingAddress"
                          value={orderData.shippingAddress}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="shippingCity"
                          value={orderData.shippingCity}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="shippingState"
                          value={orderData.shippingState}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>ZIP</Form.Label>
                        <Form.Control
                          type="text"
                          name="shippingZip"
                          value={orderData.shippingZip}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Select
                          name="paymentMethod"
                          value={orderData.paymentMethod}
                          onChange={handleChange}
                        >
                          <option>Credit Card</option>
                          <option>Debit Card</option>
                          <option>PayPal</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Shipping Method</Form.Label>
                        <Form.Select
                          name="shippingMethod"
                          value={orderData.shippingMethod}
                          onChange={handleChange}
                        >
                          <option>Standard Shipping</option>
                          <option>Express Shipping</option>
                          <option>Next-Day Shipping</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    variant="warning"
                    className="mt-4"
                    disabled={cart.length === 0}
                  >
                    Checkout
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Order Summary</h4>
                <p>Pre-tax Total: <strong>${preTaxTotal.toFixed(2)}</strong></p>
                <p>Tax (6%): <strong>${tax.toFixed(2)}</strong></p>
                <h5>Total: <strong>${finalTotal.toFixed(2)}</strong></h5>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {invoiceVisible && (
        <>
          <Alert variant="success">Order placed successfully.</Alert>
          <Invoice orderData={orderData} cart={cart} preTaxTotal={preTaxTotal} />
          <Button variant="dark" className="mt-3" onClick={handleNewOrder}>
            Start New Order
          </Button>
        </>
      )}
    </Container>
  );
}

export default Checkout;