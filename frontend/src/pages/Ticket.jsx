import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/TicketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Ticket() {
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  // dest
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('params are', params);
  // const { ticketId  = params.ticketId;
  // Show the TIcket Data here
  useEffect(() => {
    if (isError) {
      toast.error(message); // the message that come from the state
    }

    dispatch(getTicket(params.ticketId));
  }, [isError, message, params.ticketId]);

  // close Ticket
  const onTicketClosed = () => {
    dispatch(closeTicket(params.ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };
  if (isLoading) return <Spinner />;
  if (isError) {
    return <h3>Something went worng</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url={'/tickets'} />

        <h2>
          Ticket id = {ticket._id}
          <span className={`status staus-${ticket.stats}`}>{ticket.stats}</span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.stats !== 'closed' && (
        <>
          <button className="btn btn-block btn-danger" onClick={onTicketClosed}>
            {' '}
            Close
          </button>
        </>
      )}
    </div>
  );
}

export default Ticket;
