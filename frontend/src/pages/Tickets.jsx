import React from 'react'

// Model

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import SortItem from '../components/SortItem'

import {
  getUserTickets,
  reset,
  closeTicket,
  updateTickets,
} from '../features/tickets/ticketSlice'
import BackHeader from '../components/BackHeader'
import Ticket from './Ticket'

// fetch the tickets data in here
function Tickets() {
  const { isError, isSuccess, isLoading, tickets } = useSelector(
    (state) => state.tickets
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //   if we want something to happen on the unmount we have to return function from use effect
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getUserTickets())
  }, [dispatch])

  /**
   * ---------------
   * Sorting Tickets
   * ---------------
   */
  const sortTickets = (by) => {
    let sortedTickets = [...tickets] // Create a copy of the tickets array
    switch (by) {
      case 'Product':
        sortedTickets.sort((a, b) => a.product.localeCompare(b.product))
        break
      case 'Status':
        sortedTickets.sort((a, b) => a.status.localeCompare(b.status))
        break
      case 'Date':
        sortedTickets.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
        break
      default:
        break
    }

    return sortedTickets
  }

  if (isLoading) {
    return <Spinner />
  }
  if (isLoading) return <Spinner />
  return (
    <div>
      {/* <BackHeader url="/" title="Tickest" /> */}
      {/* <BackButton url="/" />
      <h1>Tickest</h1> */}

      {/*  Adding the sort Functinolaity */}

      {/* <div>
      <div className="ticket-headings-sort">
        <BackButton url={'/'} />
        <SortItem
          OnChangeparam={(e) => {
            const sorted = sortTickets(e.target.value);
            dispatch(updateTickets(sorted));
          }}
        />
      </div> */}

      <div className="ticket-headings-sort">
        <BackButton url={'/'} />

        <SortItem
          OnChangeparam={(e) => {
            console.log(e.target.value)
            const sorted = sortTickets(e.target.value)
            dispatch(updateTickets(sorted))
          }}></SortItem>
      </div>
      {/* Load the List ui here */}
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div> </div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  )
}

export default Tickets
