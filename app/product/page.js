import { Suspense } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProductDetailClient from '@/components/ProductDetailClient';

export const metadata = { title: 'Product — SHAAW-TEE' };

export default function ProductPage() {
  return (
    <>
      <Nav ctaHref="/shop" ctaLabel="← all tees" />
      <Suspense fallback={null}>
        <ProductDetailClient />
      </Suspense>
      <Footer />
    </>
  );
}
