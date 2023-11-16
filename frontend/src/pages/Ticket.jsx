import React from 'react';
import { FaPlus } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket } from '../features/tickets/TicketSlice';
import {
  getNotes,
  reset as notesReset,
  createNote,
} from '../features/notes/noteSlice';
import NoteItem from '../components/NotetItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  // const { ticket } = useSelector((state) => state.tickets);

  // const { notes } = useSelector((state) => state.notes);

  const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  };
  Modal.setAppElement('#root');
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  // dest
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('params are', params);
  const { ticketId } = useParams();

  // const { ticketId  = params.ticketId;
  // Show the TIcket Data here
  useEffect(() => {
    if (isError) {
      toast.error(message); // the message that come from the state
    }

    dispatch(getTicket(params.ticketId));

    //get Ticket Notes
    dispatch(getNotes(params.ticketId));
  }, [isError, message, params.ticketId]);

  // Create note submit
  const onNoteSubmit = (e) => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }))
      .unwrap()
      .then(() => {
        setNoteText('');
        closeModal();
      })
      .catch(toast.error);
  };

  // close Ticket
  const onTicketClosed = () => {
    dispatch(closeTicket(params.ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };
  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  if (isLoading || notesIsLoading) return <Spinner />;
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
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      {/* Modal for adding the notes */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note">
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {/* adding notes  */}
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}
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
