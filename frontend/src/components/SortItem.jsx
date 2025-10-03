import React from 'react'

function SortItem({ OnChangeparam }) {
  return (
    <div>
      <select id="select-sort" onChange={OnChangeparam}>
        <option value="Product">Product</option>
        <option value="Status">Status</option>
        <option value="Date">Date</option>
      </select>
    </div>
  )
}

export default SortItem
