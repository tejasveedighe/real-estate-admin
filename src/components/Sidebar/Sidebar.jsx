import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { handleSignOut } from "../../utils/auth";
import { VscDashboard } from "react-icons/vsc";
import { SiBitcoincash } from "react-icons/si";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdRequestPage } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";

export default function Sidebar() {
  return (
    <aside className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary sticky-top h-100">
      <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul className="nav flex-column">
          <li className="nav-item" key={uuid()}>
            <Link
              className="nav-link d-flex align-items-center gap-2 active"
              aria-current="page"
              to="/"
            >
              <VscDashboard />
              Dashboard
            </Link>
          </li>
          <li className="nav-item" key={uuid()}>
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/payments"
            >
              <SiBitcoincash />
              Payments
            </Link>
          </li>
          <li className="nav-item" key={uuid()}>
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/property"
            >
              <MdOutlineHomeWork />
              Properties
            </Link>
          </li>
          <li className="nav-item" key={uuid()}>
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/manageUsers"
            >
              <FaUsers />
              Manage Users
            </Link>
          </li>
          <li className="nav-item" key={uuid()}>
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/requests"
            >
              <MdRequestPage />
              Requests
            </Link>
          </li>
          <li className="nav-item" key={uuid()}>
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to="/offers"
            >
              <BiSolidOffer />
              Offers
            </Link>
          </li>
        </ul>

        <hr className="my-3" />

        <ul className="nav flex-column mb-auto">
          <li className="nav-item" key={uuid()}>
            <Link
              onClick={handleSignOut}
              className="nav-link d-flex align-items-center gap-2"
              href="#"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
