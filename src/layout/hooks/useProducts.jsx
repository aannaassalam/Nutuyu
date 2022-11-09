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
  const [products, setproducts] = useState(null);

  useEffect(() => {
    const prod = collection(getFirestore(), "products");
    onSnapshot(prod, (snap) => {
      var arr = [];
      snap.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setproducts(arr);
    });
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}
