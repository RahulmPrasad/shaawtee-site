'use client';

import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { useProducts } from '@/context/ProductsContext';

export default function CurrentDropGrid() {
  const { visibleProducts, loading } = useProducts();
  const currentDrop = visibleProducts.slice(0, 3);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>loading the drop...</p>;
  }

  return (
    <div className="products-grid">
      {currentDrop.map((product, i) => (
        <Reveal key={product.id} delay={i * 0.15}>
          <ProductCard product={product} ctaLabel="ADD TO BAG +" />
        </Reveal>
      ))}
    </div>
  );
}
