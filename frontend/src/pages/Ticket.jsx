import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/tickets/TicketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function Ticket() {
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  // dest
  const params = useParams();
  const dispatch = useDispatch();

  const { ticketId } = params.ticketId;
  // Show the TIcket Data here
  useEffect(() => {
    if (isError) {
      toast.error(message); // the message that come from the state
    }
    // dispatch(getTicket(ticketId));
  }, [isError, message, ticketId]);

  return (
    <div>
      <BackButton />
      Ticket
    </div>
  );
}

export default Ticket;
