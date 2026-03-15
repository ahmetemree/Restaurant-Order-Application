import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function PaymentModal({ show, onHide, orderItems, total, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState("nakit");

  function handleConfirm() {
    onConfirm(paymentMethod);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered className="payment-modal">
      <Modal.Header closeButton>
        <Modal.Title>Odeme Al</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="fw-bold mb-3">Siparis Ozeti</h6>
        <div>
          {orderItems.map((item) => (
            <div key={item.id} className="payment-summary-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="fw-semibold">{(item.price * item.quantity).toFixed(2)} TL</span>
            </div>
          ))}
        </div>
        <div className="payment-total">
          <span className="payment-total-label">Toplam</span>
          <span className="payment-total-amount">{total.toFixed(2)} TL</span>
        </div>
        <Form.Group>
          <Form.Label className="fw-semibold">Odeme Yontemi</Form.Label>
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="rounded-3"
          >
            <option value="nakit">Nakit</option>
            <option value="kart">Kredi / Banka Karti</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="rounded-3" onClick={onHide}>
          Iptal
        </Button>
        <Button className="btn-confirm-payment" onClick={handleConfirm}>
          Odemeyi Onayla
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentModal;
