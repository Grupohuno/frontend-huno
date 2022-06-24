import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Router from 'next/router';
import { Link } from "@mui/material";



export default function CatalogMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const query = (query) => Router.push({
    pathname: '/catalog',
    query: { category: query },
  });
  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div> 
      <Link
        onMouseOver={handleHover}
        href={'/catalog'}
        style={{color:"#fff", textDecoration: 'none'}}
      >
          Catálogo
        
      </Link>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          onMouseLeave: handleClose,
        }}
      >
        <MenuItem onClick={() => Router.push('/catalog')} id={"all"}>Todos</MenuItem>
        <MenuItem onClick={() => query("pisco")} id={"piscoCategory"}>Piscos</MenuItem>
        <MenuItem onClick={() => query("cerveza")} id={"beerCategory"}>Cervezas</MenuItem>
        <MenuItem onClick={() => query("bebida")} id={"sodaCategory"}>Bebidas</MenuItem>
      </Menu>
    </div>
  );
}
