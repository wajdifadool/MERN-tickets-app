import React from 'react'
import { FaSort } from 'react-icons/fa'

function SortButton({ onSortClick }) {
  const [open, isOpen] = useState(true)
  return (
    <div>
      <button onClick={onSortClick} className="btn btn-reverse btn-back">
        <FaSort /> Sort{' '}
      </button>
    </div>
  )
}

export default SortButton
