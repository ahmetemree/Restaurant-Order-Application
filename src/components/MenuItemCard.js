import { Button } from "react-bootstrap";

function MenuItemCard({ item, onAddToOrder, onEdit, onDelete }) {
  return (
    <div className="menu-card d-flex justify-content-between align-items-center">
      <div>
        <div className="menu-card-name">{item.name}</div>
        <div className="menu-card-price">{item.price.toFixed(2)} TL</div>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <Button className="btn-edit" onClick={() => onEdit(item)}>
          Duzenle
        </Button>
        <Button className="btn-delete" onClick={() => onDelete(item.id)}>
          Sil
        </Button>
        <Button className="btn-add-to-order" onClick={() => onAddToOrder(item)}>
          Siparise Ekle
        </Button>
      </div>
    </div>
  );
}

export default MenuItemCard;
