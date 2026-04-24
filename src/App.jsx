import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import inventoryData from "./data/products.json";
import SiteNavbar from "./components/SiteNavbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("rushHourProducts");
    return savedProducts ? JSON.parse(savedProducts) : inventoryData;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("rushHourCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("rushHourProducts", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("rushHourCart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const preTaxTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - 1 } : p
      )
    );

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);

      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - 1 } : p
      )
    );

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (!cartItem) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + 1 } : p
      )
    );

    if (cartItem.quantity === 1) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  }

  function removeFromCart(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (!cartItem) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + cartItem.quantity } : p
      )
    );

    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <BrowserRouter>
      <SiteNavbar cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={<Home products={products} addToCart={addToCart} />}
        />
        <Route
          path="/products"
          element={<Products products={products} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              preTaxTotal={preTaxTotal}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              preTaxTotal={preTaxTotal}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;                                            