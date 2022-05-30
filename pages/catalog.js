import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import CatalogSidebar from "../components/catalogSidebar";
import styles from "../styles/Catalog.module.css";
import axios from "axios";
const Catalog = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const url = router.query.category
        ? process.env.NEXT_PUBLIC_HEROKU_URL +
          "products/" +
          router.query.category
        : router.query.search
        ? process.env.NEXT_PUBLIC_HEROKU_URL +
          "product-search?keyword=" +
          router.query.search
        : process.env.NEXT_PUBLIC_HEROKU_URL + "products/";
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const categories = ['Cerveza', 'Pisco', 'Bebida'];
  const sellers = ['Lider', 'Liquidos'];

  useEffect(() => fetchProducts(), []);
  useEffect(() => fetchProducts(), [router.query.category]);

  return (
    <CatalogSidebar props={{products, setProducts, categories, sellers}}>
      <div>
        <Head>
          <title>Catálogo</title>
        </Head>
        <h1>Catálogo</h1>
        <div className={styles.grid}>
          {products.map((product, i) => {
            return (
              <div key={i} className={styles.card}>
                <ProductCard key={i} props={{...product, height: 380, width: 285}} />
              </div>
            );
          })}
        </div>
      </div>
    </CatalogSidebar>
  );
};

export default Catalog;
