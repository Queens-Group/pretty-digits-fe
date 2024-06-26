"use client"
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SortSelect({items}) {
  const [age, setAge] = React.useState('');
  

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="sort-select-price">Sort</InputLabel>
      <Select
        labelId="sort-select-price-label"
        id="sort-select-price"
        value={age}
        label="Sort"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.name} value={item.value}>{item.name}</MenuItem>
        ))}
       
      </Select>
    </FormControl>
  );
}
