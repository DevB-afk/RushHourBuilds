import { Card, Button, Col, Row } from "react-bootstrap";

function CartItem({ item, increaseQuantity, decreaseQuantity, removeFromCart }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={2}>
            <img src={item.image} alt={item.name} className="img-fluid rounded" />
          </Col>
          <Col md={4}>
            <h5>{item.name}</h5>
            <p className="mb-1 text-muted">{item.category}</p>
            <p className="mb-0">${item.price.toFixed(2)} each</p>
          </Col>
          <Col md={3} className="mt-3 mt-md-0">
            <div className="d-flex gap-2">
              <Button variant="outline-dark" onClick={() => decreaseQuantity(item.id)}>-</Button>
              <Button variant="light" disabled>{item.quantity}</Button>
              <Button variant="outline-dark" onClick={() => increaseQuantity(item.id)}>+</Button>
            </div>
          </Col>
          <Col md={2} className="mt-3 mt-md-0">
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </Col>
          <Col md={1} className="mt-3 mt-md-0">
            <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
              X
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CartItem;