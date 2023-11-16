import React from 'react';
import { Link } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux'; // like calling gloabal instance
function NoteItem({ key, note }) {
  const { user } = useSelector((state) => state.auth); // get the user from the state
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}>
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div>{new Date(note.createdAt).toLocaleString('en-gb')}</div>
    </div>
  );
}

export default NoteItem;
