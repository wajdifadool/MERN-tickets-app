// import React from 'react';
// import { useEffect } from 'react';
// import Spinner from '../components/Spinner';
// import BackButton from '../components/BackButton';

// import { useDispatch, useSelector } from 'react-redux';
// import { getTickets } from '../features/tickets/TicketSlice';
// import { reset } from 'nodemon';

// function Tickets() {
//   const { tickets, isLoading, isSuccess } = useSelector(
//     (state) => state.ticket
//   );

//   const dispatch = useDispatch();

//   // clear the states on on mount
//   useEffect(() => {
//     // if we want something th hapen on on unmount we return afunction on the useEffect
//     return () => {
//       if (isSuccess) {
//         dispatch(reset());
//       }
//     };
//   }, [dispatch, isSuccess]);

//   // get the The tickites actoin
//   useEffect(() => {
//     dispatch(getTickets());
//   }, [dispatch]);

//   if (isLoading) return <Spinner />;
//   return (
//     <div>
//       <h1>All My ticlets goes here </h1>
//     </div>
//   );
// }

// export default Tickets;
import React from 'react';

import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets, reset } from '../features/tickets/TicketSlice';
import { useNavigate } from 'react-router-dom';
import TicketItem from '../components/TicketItem';

function Tickets() {
  // Bring the  state via redux
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );

  // dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // clear the states on on mount
  useEffect(() => {
    // if we want something th hapen on on unmount we return afunction on the useEffect
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  // get the The tickites action
  useEffect(() => {
    dispatch(getTickets());
    console.log(tickets);
  }, [dispatch]);

  if (isLoading) return <Spinner />;
  return (
    <div>
      <BackButton url="/" />
      {/* Load the List ui here */}
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default Tickets;
