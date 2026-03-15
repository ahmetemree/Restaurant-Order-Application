import { useState } from "react";
import { Button } from "react-bootstrap";
import OrderItem from "./OrderItem";
import PaymentModal from "./PaymentModal";

function OrderSection({ orderItems, onIncrease, onDecrease, onClearOrder }) {
  const [showPayment, setShowPayment] = useState(false);

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handlePaymentConfirm(paymentMethod) {
    onClearOrder();
  }

  return (
    <div className="order-panel">
      <h4 className="panel-title mb-4">Siparis</h4>

      {orderItems.length === 0 ? (
        <div className="order-empty">
          <p>Siparis bos.</p>
          <p style={{ fontSize: "0.85rem" }}>Menuden urun ekleyerek baslayabilirsin.</p>
        </div>
      ) : (
        <>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {orderItems.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))}
          </div>

          <div className="order-total-bar">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="order-total-label">Toplam Tutar</span>
              <span className="order-total-amount">{total.toFixed(2)} TL</span>
            </div>
            <Button className="btn-payment" onClick={() => setShowPayment(true)}>
              Odeme Al
            </Button>
          </div>
        </>
      )}

      <PaymentModal
        show={showPayment}
        onHide={() => setShowPayment(false)}
        orderItems={orderItems}
        total={total}
        onConfirm={handlePaymentConfirm}
      />
    </div>
  );
}

export default OrderSection;
