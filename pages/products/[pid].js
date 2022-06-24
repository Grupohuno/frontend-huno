import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Product.module.css";
import Button from "@mui/material/Button";
import Carousel from "../../components/carousel/carousel";
import SimilarProductCard from "../../components/similarProductCard";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
const Product = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "products/" + pid
      );
      setProduct(response.data);
      setSimilarProduct(response.data.recommended_products);
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
    return (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"45vh"
      }}
    >
      <CircularProgress />
    </div>
        
    );
  } else if (!error) {
    return (
      <div className={styles.colcontainer}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={product.image} />
        </div>
        <div className={styles.info}>
        <Typography variant="h3" >{product.name}</ Typography>
        <Typography variant="h3" >${product.price}</Typography>
        <Typography variant="h5">{product.category}</Typography>
        <Typography variant="h5" >{product.brand}</Typography>
        <Typography variant="h6" >Vendido por: {product.store}</Typography>
          <Button href={product.redirect_page} size="small">
          <Typography variant="h6" color="text.secondary">Ir a la tienda</Typography>
            
          </Button>
          
        </div>
        
     
        <div>
          
      

        </div>
        

      </div>
      <div >
      <h2 style={{marginLeft:"12vh"}}>Tambien te puede interesar </h2>
      <Carousel collapse={false} splitIndex={1} >
      
          {similarProducts.map(p => (
            <SimilarProductCard  props={p}/>
          ))}
        </Carousel>
  
      </div>
      </div>
    );
  }
};

export default Product;
