import { useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MenuSection from "./components/MenuSection";
import OrderSection from "./components/OrderSection";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [orderItems, setOrderItems] = useState([]);

  const handleAddToOrder = useCallback((menuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  }, []);

  function handleIncrease(itemId) {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrease(itemId) {
    setOrderItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleClearOrder() {
    setOrderItems([]);
  }

  return (
    <>
      <div className="app-header">
        <Container>
          <h2 className="mb-0 text-center">Restoran Siparis Paneli</h2>
        </Container>
      </div>
      <Container>
        <Row className="g-3">
          <Col md={7}>
            <div className="panel">
              <MenuSection onAddToOrder={handleAddToOrder} />
            </div>
          </Col>
          <Col md={5}>
            <OrderSection
              orderItems={orderItems}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onClearOrder={handleClearOrder}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
