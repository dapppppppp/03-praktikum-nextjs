import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div>
      <h1>Tentang Kami</h1>
      <p>Ini adalah halaman tentang kami.</p>
      <Link href="/">
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
};

export default AboutPage;