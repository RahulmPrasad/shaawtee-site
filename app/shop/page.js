import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ShopPageClient from '@/components/ShopPageClient';

export const metadata = { title: 'All Tees — SHAAW-TEE' };

export default function ShopPage() {
  return (
    <>
      <Nav ctaHref="/" ctaLabel="← home" />
      <ShopPageClient />
      <Footer />
    </>
  );
}
