import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { createNewTicket, reset } from '../features/tickets/ticketSlice'

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
function NewTicket() {
  // sort of SingleTone instance
  const { user } = useSelector((state) => state.auth)

  // from TicketSLice
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //   const [name, setName] = useState(user.name)
  // const [email, seteamil] = useState(user.email)
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  useEffect(() => {
    // this fields will be changed aotomaaticly
    if (isError) {
      toast.error(message)
    } else if (isSuccess) {
      //   ok  now resatr the states ,
      dispatch(reset())
      // navigate to tickets
      navigate('/tickets')
      toast.success('Ticket created ')
    }
  }, [isError, isSuccess, message, navigate, dispatch])

  //   Inner Functions
  const onSubmit = (e) => {
    e.preventDefault()

    console.log('calling on submit')
    // freate the new ticket objecct

    const ticketObject = {
      name,
      email,
      product,
      description,
    }
    // call the create tikcet fuction
    dispatch(createNewTicket(ticketObject))
    //after this is  done , there is no feedback ,
    // there for we use the useEffect()
  }
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create new Ticket</h1>
        <p>please fill out the form and submit</p>
      </section>

      <section className="form">
        {/* user Name  */}
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            name=""
            id=""
            disabled
            value={name}
            className="form-control"
          />
        </div>

        {/* User Email */}
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="email"
            name="email"
            id=""
            value={email}
            className="form-control"
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
              <option value="MacBook">MacBook</option>
            </select>
          </div>
          {/* Descriotion  */}
          <div className="form-group">
            <label htmlFor="description">description of the issue</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              value={description}
              placeholder="issue Description"
              onChange={(e) => setDescription(e.target.value)}>
              {/* Te */}
            </textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
