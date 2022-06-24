import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import CatalogSidebar from "../components/catalogSidebar";
import styles from "../styles/Catalog.module.css";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

const Catalog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({category: [], brand: [], store: [], priceRange: [0, 120000]});
  const [paginationActivated, setPaginationActivated] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [noProductsText, setNoProductsText] = useState(false);
  const [completeData, setCompleteData] = useState(false);

  const fetchProducts = async (fetchAll) => {
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!paginationActivated) {
        url +=  'np/';
        if (router.query.search) url += `product-search/?keyword=${router.query.search}`;
        else url += "products/"
        if (router.query.category) setFilters((prevFilters) => {
          const newFilters = { ...prevFilters };
          if (newFilters["category"].length === 0)
            newFilters["category"].push(
              router.query.category[0].toUpperCase() +
                router.query.category.slice(1)
            );
          return newFilters;
        })
        if (url === process.env.NEXT_PUBLIC_BACKEND_URL + "np/products/")
          setCompleteData(true);
      } else {
        if (router.query.category) url += `products/category/${router.query.category}`;
        else if (router.query.search) url += `product-search/?keyword=${router.query.search}`;
        else url += "products/"
        if (currentPage !== 1) url += `?page=${currentPage}`;
      }
      if (!completeData) {
        const response = await axios.get(url);
        const data = paginationActivated 
          ? response.data.results
          : response.data;
        setTotalProducts(paginationActivated ? response.data.count : data.length);
        setProducts(data);
        setVisibleProducts(paginationActivated ? data : data.slice((currentPage - 1) * 40, currentPage * 40));
        let tempBrands = [];
        data.forEach((p) => {
          if (!tempBrands.includes(p.brand)) tempBrands.push(p.brand);
        });
        setBrands(tempBrands);
        setNoProductsText(false);
      }
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

  useEffect(() => setPaginationActivated(false), [filters]);

  useEffect(() => {
    fetchProducts();
  }, [router.query.category, router.query.search, paginationActivated, currentPage]);

  useEffect(() => {
    if (!paginationActivated)
    setVisibleProducts(() => {
      const newProducts = [...products].filter(
        (p) =>
          (filters["category"].includes(p.category) || filters["category"].length === 0) &&
          (filters["brand"].includes(p.brand) || filters["brand"].length === 0) &&
          (filters["store"].includes(p.store) || filters["store"].length === 0) &&
          (filters["priceRange"][0] <= p.price && filters["priceRange"][1] >= p.price)
      );
      setTotalProducts(newProducts.length);
      const finalProducts = newProducts.slice((currentPage - 1) * 40, currentPage * 40);
      return finalProducts;
    });
  }, [filters, products, currentPage]);

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
        {loading && <div className={styles.loading}><CircularProgress /></div>}
        {noProductsText && !loading && <h3>No se encontraron productos</h3>}
        {totalProducts ? 
        <>
          <div className={styles.grid}>
            {visibleProducts.map((product, i) => {
              return (
                <div key={i} className={styles.card}>
                  <ProductCard key={i} props={{...product, height: 380, width: 280}} />
                </div>
              );
            })}
          </div>
          <div className={styles.pagePicker}>
            <Pagination onChange={handlePageChange} page={currentPage} count={Math.ceil(totalProducts / 40)} variant="outlined" shape="rounded" />
          </div>
        </> : null}
      </div>
    </CatalogSidebar>
  );
};

export default Catalog;
