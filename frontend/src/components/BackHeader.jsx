import React from 'react'
import BackButton from './BackButton'

function BackHeader({ title, url }) {
  return (
    <div className="pageHeading">
      <BackButton url={url} />
      <h1 className="page-title">{title}</h1>
    </div>
  )
}

export default BackHeader
