import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartClient from '@/components/CartClient';

export const metadata = { title: 'Your Bag — SHAAW-TEE' };

export default function CartPage() {
  return (
    <>
      <Nav ctaHref="/" ctaLabel="shop the drop ↗" activeCart />
      <CartClient />
      <Footer />
    </>
  );
}
