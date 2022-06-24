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
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({category: [], brand: [], store: [], priceRange: [0, 300000]});
  const fetchProducts = async () => {
    try {
      const url = router.query.category
        ? process.env.NEXT_PUBLIC_BACKEND_URL +
          "products/" +
          router.query.category
        : router.query.search
        ? process.env.NEXT_PUBLIC_BACKEND_URL +
          "product-search/?keyword=" +
          router.query.search
        : process.env.NEXT_PUBLIC_BACKEND_URL + "products/";
      const response = await axios.get(url);
      setProducts(response.data.results);
      setVisibleProducts(response.data.results);
      setBrands(response.data.results.map((p) => {
          if (!brands.includes(p.brand)) return p.brand;
        }
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const categories = ['Cerveza', 'Pisco', 'Bebida'];
  const stores = ['Lider', 'Liquidos'];

  useEffect(() => fetchProducts(), []);
  useEffect(() => fetchProducts(), [router.query.category]);
  useEffect(() => {
    setVisibleProducts(() => {
      const newProducts = [...products];
      return newProducts.filter(
        (p) =>
          (filters["category"].includes(p.category) || filters["category"].length === 0) &&
          (filters["brand"].includes(p.brand) || filters["brand"].length === 0) &&
          (filters["store"].includes(p.store) || filters["store"].length === 0) &&
          (filters["priceRange"][0] <= p.price && filters["priceRange"][1] >= p.price)
      );
    });
  }, [filters])

  return (
    <CatalogSidebar props={{categories, brands, stores, filters, setFilters}}>
      <div>
        <Head>
          <title>Catálogo</title>
        </Head>
        <h1 id={"catalogTitle"}>Catálogo</h1>
        <div className={styles.grid}>
          {visibleProducts.map((product, i) => {
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
