import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CATEGORIES = ["Yemekler", "Icecekler", "Tatlilar"];

function MenuItemModal({ show, onHide, onSave, editingItem }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setPrice(String(editingItem.price));
      setCategory(editingItem.category);
    } else {
      setName("");
      setPrice("");
      setCategory(CATEGORIES[0]);
    }
  }, [editingItem, show]);

  function handleSubmit(e) {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    if (!name.trim() || isNaN(parsedPrice) || parsedPrice <= 0) return;
    onSave({ name: name.trim(), price: parsedPrice, category });
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered className="item-modal">
      <Modal.Header closeButton>
        <Modal.Title>{editingItem ? "Urunu Duzenle" : "Yeni Urun Ekle"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Urun Adi</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ornek: Adana Kebap"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Fiyat (TL)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Kategori</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded-3" onClick={onHide}>
            Iptal
          </Button>
          <Button className="btn-save-item" type="submit">
            {editingItem ? "Guncelle" : "Ekle"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default MenuItemModal;
