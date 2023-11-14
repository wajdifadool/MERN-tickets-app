import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

import { createTicket, reset } from '../features/tickets/TicketSlice';

import BackButton from '../components/BackButton';

function NewTicket() {
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  // get user from global sate
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [email, seEmail] = useState(user.email);
  // no need for then
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  // init dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      toast.success('successfully created ! ');
      navigate('/');
    }

    if (isError) {
      toast.error('not created ! ');
    }
  }, [dispatch, isSuccess, isError]);
  // useEffect(() => {
  //   if (isError) {

  //   }

  //   if (isSuccess) {
  //     // reset the state
  //     // navigate('/tickets');
  //     toast.success('Ticket created and reseted  ');
  //   }

  //   // if (reset && typeof reset === 'function') {
  //   //   console.log('rest');
  //   //   // dispatch(reset());
  //   // }
  // }, [dispatch, isError, isSuccess, navigate, message, reset]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('daipaching');
    // create ticket with object on the fly
    dispatch(createTicket({ product, description }));
  };

  // JSX
  if (isLoading) return <Spinner />;
  return (
    <>
      <BackButton url="/" />
      {/* New Ticket */}
      <section className="heading">
        <h1>Create new Ticket</h1>
        <p>please Fill the form below : </p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={name}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={email}
            disabled
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}>
              <option value="iPhone">iPhone</option>
              <option value="MacBook Air">MacBook Air</option>
              <option value="MacBook Pro">MacBook Pro</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
        </form>

        <div className="form-group">
          <label htmlFor="description">Description of the issue</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <button className="btn btn-block" onClick={onSubmit}>
            {' '}
            submit
          </button>
        </div>
      </section>
    </>
  );
}

export default NewTicket;
