import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CheckoutClient from '@/components/CheckoutClient';

export const metadata = { title: 'Checkout — SHAAW-TEE' };

export default function CheckoutPage() {
  return (
    <>
      <Nav ctaHref="/cart" ctaLabel="← back to bag" />
      <CheckoutClient />
      <Footer />
    </>
  );
}
