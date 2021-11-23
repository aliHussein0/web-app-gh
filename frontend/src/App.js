import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from './components/users-list';
import Validate from './components/validate-number';
import AddUser from './components/add-user';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand" style={{ marginLeft: 20 }}>
          Customer App
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              Customers List
            </Link>
          </li>
          <li>
            <Link to="/validate" className="nav-link">
              Validate Phone Number
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={
            <div style={{ textAlign:"center" }}>
              <h1>Welcome !</h1>
            </div>
          } />
          <Route path="/users/*" element={<UsersList />} />
          <Route path="/users/add-user" element={<AddUser />} />
          <Route path="/users/:id/edit" element={<AddUser />} />
          <Route path="/validate" element={<Validate />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
