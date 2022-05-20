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

export default function ProductCard({ props }) {
  const [descExpanded, setDescExpanded] = useState(false);
  const { id, name, category, brand, size, redirect_page, price, image, store } = props;
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
    <Card sx={{ minHeight: 355, height: "auto", width: 345 }}>
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
          <a className={cardStyles.title} href={`/products/${id}`}>{name}</a>
        </Typography>
        <Typography
          style={{ minHeight: 60, height: "auto" }}
          variant="body2"
          color="text.secondary"
        >
          {/* {description.length >= 80 && !descExpanded
            ? description.slice(0, 80)
            : description}
          {description.length >= 80 ? (
            <a className={cardStyles.link} onClick={handleExpand}>
              {descExpanded ? "...Ver menos" : "...Ver mas"}
            </a>
          ) : null} */}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ${price}
        </Typography>
        <CardActions style={{alignItems: 'flex-end', justifyContent: 'right'}}>
          <StyledButton variant="outlined" href={redirect_page} size="small">
            Ir a la tienda
          </StyledButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}
