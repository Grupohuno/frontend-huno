import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import cardStyles from "../styles/Card.module.css";
import Link from 'next/link';

export default function ProductCard({ props }) {
  const [descExpanded, setDescExpanded] = useState(false);
  const { id, name, category, brand, size, redirect_page, price, image, store, height, width } = props;
  const handleExpand = () => {
    setDescExpanded(!descExpanded);
  };

  const StyledButton = styled(Button)`
  color: #21b6a8;
  border-color: #21b6a8;
  &:hover {
    color: #ffa500;
    border-color: #ffa500;
  }
`;

  return (
    <Card sx={{ height: height, width: width }}>
      <CardMedia
        component="img"
        height="190"
        image={image}
        alt="item"
      />
      <CardContent>
        <Typography gutterBottom variant="button" component="div">
          {store}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <Link className={cardStyles.title} href={`/products/${id}`}>{name}</Link>
        </Typography>
 
        <CardActions style={{flexDirection: "row"}}>

          <Typography style={{width: "50%"}} variant="h6" color="text.secondary">
            ${price}
          </Typography>
        
          <StyledButton style={{width: "50%"}} variant="outlined" href={redirect_page} size="small">
            Ir a la tienda
          </StyledButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}
