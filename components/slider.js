import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

export default function RangeSlider({ props }) {
  const { filters, setFilters } = props;
  const [value, setValue] = useState([0, 120000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMouseUp = (event, newValue) => {
    setFilters((prevFilters) => {
        const newFilters = {...prevFilters};
        newFilters["priceRange"] = newValue;
        return newFilters;
    });
  };

  return (
    <Box sx={{ width: 180 }}>
      <Slider
        max={120000}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleMouseUp}
        valueLabelDisplay="auto"
        size="small"
      />
      ${filters["priceRange"][0]} - ${filters["priceRange"][1]}
    </Box>
  );
}