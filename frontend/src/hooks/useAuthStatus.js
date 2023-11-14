/**
 * used to check if the user is looged in ?
 * if user looged in
 * we get the user throht redux
 */

// if user looged in go to
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
  const [loogedIn, setLoogedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true); //
  // once its looaded , find if the user looged in or no and  set it to false
  // we look in the state.auth ,
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoogedIn(true);
    } else {
      setLoogedIn(false);
    }
    setCheckingStatus(false);
    // console.log('useAuthStatus.jsx::useEffect()', loogedIn, checkingStatus);
  }, [user, loogedIn, checkingStatus]);
  return { loogedIn, checkingStatus };
};
