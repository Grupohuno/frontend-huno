import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import styles from "../styles/Catalog.module.css";
import axios from "axios";
const Catalog = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_LOCAL_URL + "products/"
      );
      setProducts(response.data.slice(0, 20));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => fetchProducts(), []);

  return (
    <div>
      <Head>
        <title>Catálogo</title>
      </Head>
      <h1>Catálogo</h1>
      <p>Se buscó "{router.query.search}"</p>
      <div className={styles.grid}>
        {products.map((product, i) => {
          return (
            <div className={styles.card}>
              <ProductCard key={i} props={{...product, height: 380, width: 285}} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
