import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import useMenu from "../hooks/useMenu";
import MenuItemCard from "./MenuItemCard";
import MenuItemModal from "./MenuItemModal";

const CATEGORY_ORDER = ["Yemekler", "Icecekler", "Tatlilar"];

function MenuSection({ onAddToOrder }) {
  const { menuItems, loading, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  function handleOpenAdd() {
    setEditingItem(null);
    setShowModal(true);
  }

  function handleOpenEdit(item) {
    setEditingItem(item);
    setShowModal(true);
  }

  function handleSave(itemData) {
    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
    } else {
      addMenuItem(itemData);
    }
  }

  function groupByCategory() {
    const grouped = {};
    CATEGORY_ORDER.forEach((cat) => {
      grouped[cat] = [];
    });
    menuItems.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="secondary" />
        <p className="mt-3">Menu yukleniyor...</p>
      </div>
    );
  }

  const grouped = groupByCategory();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="panel-title">Menu</h4>
        <Button className="btn-new-item" onClick={handleOpenAdd}>
          + Yeni Urun Ekle
        </Button>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const items = grouped[category];
        if (!items || items.length === 0) return null;
        return (
          <div key={category} className="mb-4">
            <div className="category-label">{category}</div>
            {items.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToOrder={onAddToOrder}
                onEdit={handleOpenEdit}
                onDelete={deleteMenuItem}
              />
            ))}
          </div>
        );
      })}

      {menuItems.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">Henuz menuye urun eklenmedi.</p>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            Yukaridaki butona tiklayarak ilk urununu ekle.
          </p>
        </div>
      )}

      <MenuItemModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        editingItem={editingItem}
      />
    </div>
  );
}

export default MenuSection;
