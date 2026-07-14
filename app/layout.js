import './globals.css';
import { ReactLenis } from 'lenis/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import BulbToggle from '@/components/BulbToggle';

export const metadata = {
  title: 'SHAAW-TEE — Drop Culture',
  description: "Streetwear brand website for SHAAW-TEE — a Kanpur-based Gen Z drop-culture tee brand.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Caveat:wght@400;600;700&family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReactLenis root options={{ lerp: 0.1, anchors: true }} />
        <ThemeProvider>
          <CartProvider>
            {children}
            <BulbToggle />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
