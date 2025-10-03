import React from 'react'

// Model
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'
import {
  getNotes,
  reset as NoteReset,
  createNote,
} from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

// Handling Modal
//https://www.npmjs.com/package/react-modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
  },
}
Modal.setAppElement('#root')
// End of handling modal

// fetch the tickets data in here
function Ticket() {
  const [modalIsOpen, setIsOpen] = useState(false)
  // this is  Modal Form params
  const [noteText, setNoteText] = useState('')

  const { isError, isLoading, ticket } = useSelector((state) => state.tickets)

  const {
    isLoading: noteIsLoading,
    notes,
    isSuccess: isSuccessNote,
  } = useSelector((state) => state.notes)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { ticketId } = useParams() // we passed the ticket id in the params

  useEffect(() => {
    if (isError) {
      toast.error('Something went worng ')
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, ticketId])

  // CLose Ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    // OK cool
    toast.success('Ticket Closed')
    // Update the Ui
    navigate('/tickets')
  }

  // create note Submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createNote({
        noteText,
        ticketId,
      })
    )

    setNoteText('')
    toast.success('Note  created')

    closeModal()
  }

  const openModal = () => setIsOpen(true)
  function closeModal() {
    setIsOpen(false)
  }

  if (isLoading || noteIsLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Somethin went worng</h3>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />

        <h2>
          Ticket Id: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submited : {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Issue Descreption:</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status != 'closed' && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Add note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add note">
        <h2>Add note</h2>
        <button className="btn btn-close" onClick={closeModal}>
          X
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn">
              Submit Note
            </button>
          </div>
        </form>
      </Modal>

      {/* Show the Tickets Notes */}
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {/* Show the close button only of the ticket is  not closed  */}
      {/* {ticket.status !== 'closed'&& <CloseTicketButton/>} */}
      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-blocl btn-danger">
          {' '}
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
