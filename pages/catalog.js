import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router'


const Catalog = () => {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Catálogo</title>
      </Head>
      <h1>Catálogo</h1>
      <p>Se buscó "{router.query.search}"</p>
    </div>
  );
};

export default Catalog;