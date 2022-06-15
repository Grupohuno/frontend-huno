import { React, useState } from "react";
import Link from "next/link";
import { IconButton, TextField } from "@mui/material";
import { createStyles, makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import Router from 'next/router';
import CatalogMenu from "./catalogMenu";
import CloseIcon from '@mui/icons-material/Close';

import navbarStyles from "../styles/Navbar.module.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    searchField: {
      backgroundColor: '#fff',
      borderRadius: 5,
    },
  }),
);

const Navbar = () => {

  const classes = useStyles();
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSearch = (event) => {
    if (query !== '') {
      Router.push({
        pathname: '/catalog',
        query: { search: query },
      })
      event.preventDefault();
    }
  }

  const handleClear = () => {
    setQuery('');
  }
  
  return (
    <nav className={navbarStyles.nav}>
      <ul>
        <li id={"homeNavbar"}>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <CatalogMenu />
        </li>
        <li id={"aboutNavbar"}>
          <Link href={"/about"} >About Us</Link>
        </li>
        <form onSubmit={handleSearch}>
          <li>
            <TextField
              onChange={handleQueryChange}
              label="Buscar"
              variant="outlined"
              size="small"
              value={query}
            />
            <IconButton onClick={handleClear}>
              <CloseIcon />
            </IconButton>
          </li>
        </form>
        <li>
          <IconButton
            onClick={
              handleSearch
            } /* href={query ? `/catalog&search=${query}` : '/catalog'} */
          >
            <SearchIcon />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
