// this is a custome hook

import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setChekingStatus] = useState(true)

  //   from redux this will be listening to our auth object from the backend
  const { user } = useSelector((state) => state.auth)
  //
  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    setChekingStatus(false)
  }, [user])
  return { loggedIn, checkingStatus }
}
