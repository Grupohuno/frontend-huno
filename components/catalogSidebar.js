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

const drawerWidth = 240;

function CatalogSidebar({ children, props }) {
  const { products, setProducts, categories, brands, sellers, window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dropdownOpens, setDropdownOpens] = React.useState({
      'Filtros seleccionados': true,
      'Categoría': true,
      'Marca': true,
      'Precio': true,
      'Vendido por': true,
  })
  const [filters, setFilters] = React.useState(['hola']);

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
      setFilters((prevFilters) => {
          const newFilters = [...prevFilters];
          return newFilters.filter((f) => f != filter);
      })
  }

  const handleAddFilter = (filter) => {
    setFilters((prevFilters) => {
        newFilters = [...prevFilters];
        newFilters.push(filter);
        return newFilters;
    })
  }

  // filter products when filters change
  React.useEffect(() => {

  }, [filters])

  const showItems = (items, type) => {
    return (
        <Stack direction="row" spacing={1}>
            {items ? items.map((i) => {
                return (
                  <Chip
                    label={`${i}`}
                    variant="outlined"
                    onDelete={type === 'filter' ? () => handleFilterDelete(i) : null}
                    onClick={type !== 'filter' ? () => handleAddFilter(`${type}: i`) : null}
                  />
                );
            }) : null}
        </Stack>
    );
  }

  const listItem = (text) => {
    if (text === 'Filtros seleccionados') {
        showItems(filters, 'filter');
    } else if (text === 'Categoría') {
        showItems(categories, 'category');
    } else if (text === 'Marca') {
        showItems(brands, 'brand');
    } else if (text === 'Vendido por') {
        showItems(sellers, 'seller');
    }
  }

  const drawer = (
    <div>
      <List>
        {[
          "Filtros seleccionados",
          "Categoría",
          "Marca",
          "Precio",
          "Vendido por",
        ].map((text) => (
          <>
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleDropdown(text)}>
                <ListItemText primary={text} />
                {text !== 'Filtros seleccionados' ? <ListItemIcon>
                  {dropdownOpens[text] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </ListItemIcon> : null}
              </ListItemButton>
            </ListItem>
            {dropdownOpens[text] ? (
              <ListItem key={`${text}-dropdown`} disablePadding>
                  {listItem(text)}
              </ListItem>
            ) : null}
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