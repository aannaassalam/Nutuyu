import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prod = collection(getFirestore(), "products");
    onSnapshot(prod, (snap) => {
      var arr = [];
      snap.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setProducts(arr);
      setLoading(false);
    });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}
