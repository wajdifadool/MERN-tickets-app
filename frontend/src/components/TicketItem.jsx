import React from 'react'

import { Link } from 'react-router-dom'
function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div> {ticket.product}</div>
      {/* this is waht we call dynamic class */}
      <div className={`status status-${ticket.status}`}> {ticket.status}</div>
      <Link
        //
        to={`/ticket/${ticket._id}`}
        className="btn btn-reverse btn-sm">
        View Ticket
      </Link>
    </div>
  )
}

export default TicketItem
