'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchAllProducts } from '@/lib/shopify';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchAllProducts()
      .then((list) => {
        if (!cancelled) {
          setProducts(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProducts = useMemo(() => products.filter((p) => !p.nightOnly), [products]);
  const nightOnlyProducts = useMemo(() => products.filter((p) => p.nightOnly), [products]);
  const getProductById = useCallback((id) => products.find((p) => p.id === id), [products]);

  const value = useMemo(
    () => ({ products, loading, error, visibleProducts, nightOnlyProducts, getProductById }),
    [products, loading, error, visibleProducts, nightOnlyProducts, getProductById]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
