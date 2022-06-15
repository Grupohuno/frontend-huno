import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Product.module.css";
import Button from "@mui/material/Button";

const Product = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "product/" + pid
      );
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };
  useEffect(() => {
    if (pid) fetchProduct();
  }, [pid]);

  if (loading) {
    return <p>Cargando...</p>;
  } else if (!error) {
    return (
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={product.image} />
        </div>
        <div className={styles.info}>
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
          <p>{product.category}</p>
          <p>{product.brand}</p>
          <p>Vendido por: {product.store}</p>
          <Button href={product.redirect_page} size="small">
            Ir a la tienda
          </Button>
        </div>
      </div>
    );
  }
};

export default Product;
