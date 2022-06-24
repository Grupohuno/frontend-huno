import * as React from "react";
import Card from "@mui/material/Card";
import Link from 'next/link';
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import cardStyles from "../styles/Card.module.css";


export default function SimilarProductCard({ props }) {
  const [descExpanded, setDescExpanded] = useState(false);
  const {
    id,
    name,
    category,
    brand,
    size,
    redirect_page,
    price,
    image,
    store,
    height,
    width,
  } = props;
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
    <Card
      sx={{
        height: "20vh",
        width: "35vh",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography gutterBottom variant="button" component="div">
            {store}
          </Typography>
          <Typography variant="h7" color="text.secondary">
            ${price}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            <Link className={cardStyles.title} href={`/products/${id}`}>
              {name}
            </Link>
          </Typography>
        </CardContent>
      </Box>
      <CardMedia component="img" image={image} alt="item" />
    </Card>
  );
}
