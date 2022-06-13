import Head from "next/head";
import styles from "../styles/Home.module.css";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState({'Bebida': [], 'Cerveza': [], 'Pisco': []});
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_LOCAL_URL + "products/"
      );
      const hotProducts = {'Bebida': [], 'Cerveza': [], 'Pisco': []}
      response.data.forEach((product) => {
        if (['Bebida', 'Cerveza', 'Pisco'].includes(product.category) && hotProducts[product.category].length < 5) {
          hotProducts[product.category].push(product);
        }
      })
      setProducts(hotProducts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => fetchProducts(), []);

  return (
    <div>
      <Head>
        <title>Grupohuno</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.landing}>
          <img src="landing.jpg" alt="landing image"/>
          <p id="text">
            TomaTodo
          </p>
        </div>
        <h1 style={{marginLeft: 15}}>Productos destacados</h1>
        {Object.keys(products).map((category, i) => {
          return (
            <div key={i}>
            <h2 style={{marginLeft: 20, color: '#21b6a8'}}>{category}</h2>
            <div key={i} className={styles.grid}>
              {products[category].map((product, i) => {
                return (
                  <div key={i} className={styles.card}>
                    <ProductCard key={i} props={{...product, height: 500, width: 345}} />
                  </div>
                );
              })}
            </div>
            </div>
          )
        })}
        
      </main>

      <footer className={styles.footer}>Powered by Grupohuno</footer>
    </div>
  );
}
