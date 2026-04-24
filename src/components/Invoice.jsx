import { Card, Table } from "react-bootstrap";

function Invoice({ orderData, cart, preTaxTotal }) {
  const tax = preTaxTotal * 0.06;
  const finalTotal = preTaxTotal + tax;

  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <h3 className="mb-3">Invoice</h3>
        <p><strong>Customer:</strong> {orderData.fullName}</p>
        <p><strong>Email:</strong> {orderData.email}</p>
        <p><strong>Shipping Method:</strong> {orderData.shippingMethod}</p>
        <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
        <p>
          <strong>Billing Address:</strong> {orderData.billingAddress}, {orderData.billingCity}, {orderData.billingState} {orderData.billingZip}
        </p>
        <p>
          <strong>Shipping Address:</strong> {orderData.shippingAddress}, {orderData.shippingCity}, {orderData.shippingState} {orderData.shippingZip}
        </p>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Line Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <p><strong>Pre-tax Total:</strong> ${preTaxTotal.toFixed(2)}</p>
        <p><strong>Tax (6%):</strong> ${tax.toFixed(2)}</p>
        <h5><strong>Final Total:</strong> ${finalTotal.toFixed(2)}</h5>
      </Card.Body>
    </Card>
  );
}

export default Invoice;