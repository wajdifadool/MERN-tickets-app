import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
// UI Classes
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import Components
import Header from './components/Header';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';

// <> is a fragment</>
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Adding The Tickets  */}

            {/* // Will FIX: */}

            <Route
              path="/new-ticket"
              element={
                <PrivateRoute>
                  <NewTicket />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>

      {/* Toasts goes here */}
      <ToastContainer />
    </>
  );
}

export default App;

// {/* FIXME: */}
//<Route path="/new-ticket" element={<PrivateRoute />}>
{
  /* this is nested route used for checking if the usder is loged in or no  */
}
//<Route path="/new-ticket" element={<NewTicket />} />
//</Route>
