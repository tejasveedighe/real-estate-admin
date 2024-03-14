import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutWithNav from "./components/LayoutWithNav/LayoutWithNav";
import AdminRoutes from "./components/ProtectedRoutes/AdminRoutes";
import About from "./pages/About/About";
import AddProperty from "./pages/AddProperty/AddProperty";
import AllProperty from "./pages/AllProperty/AllProperty";
import Login from "./pages/Login/Login";
import ManageUser from "./pages/ManageUser/ManageUsers";
import Property from "./pages/Property/Property";
import Requests from "./pages/Requests/Requests";
import SignUp from "./pages/SignUp/SignUp";
import User from "./pages/User/User";

import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOutNav from "./components/LogOutNav/LogOutNav";
import AuthRoutes from "./components/ProtectedRoutes/AuthRoutes";
import SellerRoutes from "./components/ProtectedRoutes/SellerRoutes";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import MyProperties from "./pages/MyProperties/MyProperties";
import NotFound from "./pages/NotFound/NotFound";
import Offers from "./pages/Offers/Offers";
import Owned from "./pages/Owned/Owned";
import Payments from "./pages/Payments/Payments";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
    this.redirect = this.redirect.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  redirect() {
    window.history.back();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex align-items-center flex-column container mt-5 justify-content-center h-100">
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.toString()}</p>
          <p>Component stack trace: {this.state.errorInfo?.componentStack}</p>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.redirect}
          >
            Get Back to Previous Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route element={<LogOutNav />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<LayoutWithNav />}>
            {/* Auth Routes */}
            <Route element={<AuthRoutes />}>
              {/* Admin Routes */}
              <Route element={<AdminRoutes />}>
                <Route path="/offers" element={<Offers />} />
                <Route path="/owned" element={<Owned />} />
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/manageUsers" element={<ManageUser />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/property" element={<AllProperty />} />
                <Route path="/property/:propertyId" element={<Property />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
      <ToastContainer />
    </>
  );
}

export default App;
