import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

function useMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function addMenuItem(item) {
    await addDoc(collection(db, "menuItems"), item);
  }

  async function updateMenuItem(id, updatedItem) {
    await updateDoc(doc(db, "menuItems", id), updatedItem);
  }

  async function deleteMenuItem(id) {
    await deleteDoc(doc(db, "menuItems", id));
  }

  return { menuItems, loading, addMenuItem, updateMenuItem, deleteMenuItem };
}

export default useMenu;
