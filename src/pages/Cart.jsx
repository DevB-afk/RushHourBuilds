import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart({
  cart,
  preTaxTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <Card className="p-4 shadow-sm text-center">
          <h4>Your cart is empty.</h4>
          <Button as={Link} to="/products" variant="warning" className="mt-3">
            Go Shopping
          </Button>
        </Card>
      ) : (
        <Row>
          <Col lg={8}>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Cart Summary</h4>
                <p className="mb-3">Pre-tax Total: <strong>${preTaxTotal.toFixed(2)}</strong></p>
                <Button as={Link} to="/checkout" variant="warning" className="w-100">
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;