import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
const FilterButton = () => {
  return (
    <button className="btn btn-reverse btn-back">
      <FaFilter /> Filter{' '}
    </button>
  );
};
export default FilterButton;
