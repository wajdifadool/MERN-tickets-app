import React from 'react';
import { Link } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import { useState } from 'react';

const SortButton = ({ onSrotClick }) => {
  const [open, setOpen] = useState(true);
  return (
    <button onClick={onSrotClick} className="btn btn-reverse btn-back">
      <FaSort /> Sort{' '}
    </button>
  );
};
export default SortButton;
