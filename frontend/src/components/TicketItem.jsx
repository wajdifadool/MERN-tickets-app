import React from 'react';
import { Link } from 'react-router-dom';

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString('en-gb')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.stats}`}>{ticket.stats}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default TicketItem;
