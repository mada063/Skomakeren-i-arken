import Header from '@/components/Header';
import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Your App',
  description: 'Using Cormorant Garamond',
};

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body className=''>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        </body>
    </html>
  );
}
