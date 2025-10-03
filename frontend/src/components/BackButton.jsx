import { FaArrowCircleLeft } from 'react-icons/fa'

import { Link } from 'react-router-dom'

const BackButton = ({ url }) => {
  return (
    <div>
      <Link to={url} className="btn btn-back btn-reverse">
        <FaArrowCircleLeft />
      </Link>
    </div>
  )
}

export default BackButton
