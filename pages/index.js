import Head from "next/head";
import styles from "../styles/Home.module.css";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_HEROKU_URL + "products/"
      );
      setProducts(response.data.slice(0, 5));
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
          <img src="landing.jpg" />
        </div>
        <div className={styles.grid}>
          {products.map((product, i) => {
            return (
              <div className={styles.card}>
                <ProductCard key={i} props={product} />
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>Powered by Grupohuno</footer>
    </div>
  );
}
