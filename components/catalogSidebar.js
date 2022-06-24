import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import RangeSlider from './slider';

const drawerWidth = 240;

function CatalogSidebar({ children, props }) {
  const { categories, brands, stores, window, filters, setFilters } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dropdownOpens, setDropdownOpens] = React.useState({
      'Filtros seleccionados': true,
      'Categoría': false,
      'Marca': false,
      'Precio': false,
      'Vendido por': false,
  })

  // TO DO: add button for responsive view open/close
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDropdown = (text) => {
    if (text !== 'Filtros seleccionados')
    setDropdownOpens((prevOpens) => {
        const newOpens = { ...prevOpens };
        newOpens[text] = !newOpens[text];
        return newOpens;
    })
  }

  const handleFilterDelete = (filter) => {
      const filterType = filter.split(":")[0];
      setFilters((prevFilters) => {
          const newFilters = {...prevFilters};
          newFilters[filterType] = newFilters[filterType].filter((f) => f != filter.split(":")[1]);
          return newFilters;
      })
  }

  const handleAddFilter = (filter, type) => {
    if (!filters[type].includes(filter)) {
      setFilters((prevFilters) => {
        const newFilters = {...prevFilters};
        newFilters[type].push(filter);
        return newFilters;
      })
    }
  }

  const showItems = (items, type) => {
    const totalFilters = [];
    if (type === "filter") {
      Object.keys(items).forEach((filterType) => {
        if (filterType !== "priceRange") {
          items[filterType].forEach((item) => totalFilters.push(`${filterType}:${item}`));
        } else {
          totalFilters.push(`Precio: $${items[filterType][0]}-$${items[filterType][1]}`)
        }
      })
    }
    const filterItems = type === "filter" ? totalFilters : items;
    return (
        <Stack direction="row" spacing={1}>
            {filterItems ? filterItems.map((item, i) => {
                return (
                  <Chip
                    key={i}
                    label={type === "filter" && item.split(":")[0] !== "Precio" ? `${item.split(":")[1]}` : `${item}`}
                    variant="outlined"
                    onDelete={type === 'filter' && item.split(":")[0] !== "Precio" ? () => handleFilterDelete(item) : null}
                    onClick={type !== 'filter' ? () => handleAddFilter(item, type) : null}
                  />
                );
            }) : null}
        </Stack>
    );
  }

  const listItem = (text) => {
    if (text === 'Filtros seleccionados') {
        return showItems(filters, 'filter');
    } else if (text === 'Categoría') {
        return showItems(categories, 'category');
    } else if (text === 'Marca') {
        return showItems(brands, 'brand');
    } else if (text === 'Vendido por') {
        return showItems(stores, 'store');
    }
  }

  const drawer = (
    <div style={{overflow: 'hidden'}}>
      <List>
        {[
          "Filtros seleccionados",
          "Categoría",
          "Marca",
          "Precio",
          "Vendido por",
        ].map((text, i) => (
          <>
            <ListItem key={i} disablePadding>
              <ListItemButton onClick={() => handleDropdown(text)}>
                <ListItemText primary={text} />
                {text !== "Filtros seleccionados" && (
                  <ListItemIcon>
                    {dropdownOpens[text] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </ListItemIcon>
                )}
              </ListItemButton>
            </ListItem>
            {dropdownOpens[text] && (
              <ListItem
                key={`${text}-dropdown`}
                disablePadding
                style={{
                  alignItems: text === "Precio" ? "center" : "flex-start",
                  justifyContent: text !== "Precio" ? "left" : "center",
                  overflow: "auto",
                  height: text === "Precio" ? 100 : null,
                  marginLeft: text !== "Precio" ? 10 : 0,
                }}
              >
                {text !== "Precio" ? listItem(text) : <RangeSlider props={{filters, setFilters}} />}
              </ListItem>
            )}
          </>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'absolute', top: 60 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {children}
      </Box>
    </Box>
  );
}

CatalogSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default CatalogSidebar;