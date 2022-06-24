import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import CatalogSidebar from "../components/catalogSidebar";
import styles from "../styles/Catalog.module.css";
import axios from "axios";
import Pagination from '@mui/material/Pagination';

const Catalog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({category: [], brand: [], store: [], priceRange: [0, 300000]});
  const [currentPage, setCurrentPage] = useState(1);
  const [noProductsText, setNoProductsText] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = router.query.category
        ? process.env.NEXT_PUBLIC_BACKEND_URL +
          "products/category/" +
          router.query.category
        : router.query.search
        ? process.env.NEXT_PUBLIC_BACKEND_URL +
          "product-search/?keyword=" +
          router.query.search
        : process.env.NEXT_PUBLIC_BACKEND_URL + "products/";
      if (currentPage !== 1) url += `?page=${currentPage}`;
      const response = await axios.get(url);
      setProducts(response.data.results);
      setVisibleProducts(response.data.results);
      setBrands(response.data.results.map((p) => {
          if (!brands.includes(p.brand)) return p.brand;
        }
      ));
      setNoProductsText(false);
    } catch (error) {
      console.error(error);
      setProducts([]);
      setVisibleProducts([]);
      setBrands([]);
      setNoProductsText(true);
    }
    setLoading(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  const categories = ['Cerveza', 'Pisco', 'Bebida'];
  const stores = ['Lider', 'Liquidos'];

  useEffect(() => fetchProducts(), []);
  useEffect(() => {
    fetchProducts();
  }, [router.query.category, router.query.search, currentPage]);

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
  useEffect(() => {
    if (visibleProducts.length === 0) {
      setNoProductsText(true);
      setCurrentPage(1);
    } else setNoProductsText(false);
  }, [visibleProducts]);

  return (
    <CatalogSidebar props={{categories, brands, stores, filters, setFilters}}>
      <div>
        <Head>
          <title>Catálogo</title>
        </Head>
        <h1 id={"catalogTitle"}>Catálogo</h1>
        {loading && <h3>Cargando...</h3>}
        {noProductsText && !loading && <h3>No se encontraron productos</h3>}
        <div className={styles.grid}>
          {visibleProducts.map((product, i) => {
            return (
              <div key={i} className={styles.card}>
                <ProductCard key={i} props={{...product, height: 380, width: 250}} />
              </div>
            );
          })}
        </div>
        <div className={styles.pagePicker}>
          <Pagination onChange={handlePageChange} page={currentPage} count={10} variant="outlined" shape="rounded" />
        </div>
      </div>
    </CatalogSidebar>
  );
};

export default Catalog;
