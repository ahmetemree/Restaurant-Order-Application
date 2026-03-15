import { Button } from "react-bootstrap";

function OrderItem({ item, onIncrease, onDecrease }) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="order-item d-flex justify-content-between align-items-center">
      <div>
        <div className="order-item-name">{item.name}</div>
        <div className="order-item-detail">
          {item.price.toFixed(2)} TL x {item.quantity}
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <span className="order-item-total">{lineTotal.toFixed(2)} TL</span>
        <Button className="btn-qty" onClick={() => onDecrease(item.id)}>
          -
        </Button>
        <span className="order-qty">{item.quantity}</span>
        <Button className="btn-qty" onClick={() => onIncrease(item.id)}>
          +
        </Button>
      </div>
    </div>
  );
}

export default OrderItem;
