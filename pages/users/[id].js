import React from 'react';
import { useRouter } from 'next/router';

const UserDetail = ({ user }) => {
  const router = useRouter();

  // Jika data belum diload (misalnya saat loading awal)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detail Pengguna</h1>
      {user ? (
        <div>
          <p>Nama: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Telepon: {user.phone}</p>
          {/* Tambahkan detail lain yang ingin Anda tampilkan */}
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: true }; //  fallback: true memungkinkan SSG untuk halaman yang belum di-generate
}

export async function getStaticProps({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const user = await response.json();

    return {
      props: { user },
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      props: { user: null }, // Return null user or an error object
    };
  }
}

export default UserDetail;