import classNames from "classnames";
import Cookies from "js-cookie";
import React, { useCallback } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUserData, isLoggedIn } from "../../utils/auth";
import styles from "./Header.module.css";

function Header() {
  const handleSignOut = useCallback(() => {
    Cookies.remove("userToken");
    Cookies.remove("userId");
    Cookies.remove("userName");
    Cookies.remove("userEmail");
    window.location.reload();
  }, []);

  const { userRole: role } = getUserData();
  return (
    <nav
      className={classNames(
        "d-flex align-items-center justify-content-around sticky-top",
        styles.navbar
      )}
    >
      <div className="d-flex align-items-center justify-content-center gap-5">
        <Link to="/" className={styles.navLink}>
          <img
            src="https://preview.colorlib.com/theme/konato/assets/img/logo/logo.png"
            alt="Logo"
          />
        </Link>
        <Link className={styles.navLink} to="/">
          Home
        </Link>

        <Link className={styles.navLink} to="/property">
          Properties
        </Link>

        {role === "Seller" ? (
          <Link className={styles.navLink} to="/addProperty">
            Add Property
          </Link>
        ) : isLoggedIn() ? (
          <Link className={styles.navLink} to="/offers">
            Offers
          </Link>
        ) : null}
        {role === "Admin" ? (
          <>
            <Link className={styles.navLink} to="/manageUsers">
              Manage Users
            </Link>
            <Link className={styles.navLink} to="/payments">
              Payments
            </Link>
          </>
        ) : null}

        <Link className={styles.navLink} to="/about">
          About
        </Link>
      </div>

      {isLoggedIn() ? (
        <>
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle
              className={classNames(
                "d-flex align-items-center border-0",
                styles.dropdownToggle
              )}
            >
              <div className={styles.usericon}>
                <FaRegUser />
              </div>
              {getUserData().userName.split(" ")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className={styles.listGroup}>
                {role === "Admin" ? (
                  <Dropdown.Item className={styles.listItem}>
                    <Link
                      to="/requests"
                      className="text-black text-decoration-none"
                    >
                      Contact Requests
                    </Link>
                  </Dropdown.Item>
                ) : null}
                {role !== "Admin" ? (
                  <Dropdown.Item className={styles.listItem}>
                    <Link
                      to={role === "Seller" ? "/myProperties" : "/owned"}
                      className="text-black text-decoration-none"
                    >
                      My Properties
                    </Link>
                  </Dropdown.Item>
                ) : null}
                <Dropdown.Divider />
                <Dropdown.Item className={styles.listItem}>
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <Dropdown className={styles.dropdown}>
          <Dropdown.Toggle
            className={styles.dropdownToggle}
            id="dropdown-custom-components"
          >
            Login
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Divider as={Divider} />
            <div className={styles.listGroup}>
              <Dropdown.Item className={styles.listItem}>
                My Requests
              </Dropdown.Item>
              <Dropdown.Item className={styles.listItem}>
                Contacted Properties
              </Dropdown.Item>
              <Dropdown.Item className={styles.listItem}>
                Viewed Properties
              </Dropdown.Item>
              <Dropdown.Item className={styles.listItem}>
                Searches
              </Dropdown.Item>
            </div>
            <Dropdown.Divider />
            <div className={styles.listGroup}>
              <Dropdown.Item className={styles.listItem}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item className={styles.listItem}>
                Recommendations
              </Dropdown.Item>
            </div>
            <Dropdown.Divider />
            <div className={styles.listGroup}>
              <Dropdown.Item className={styles.loginItem} type="button">
                <Link to={"/login"} className="text-white text-decoration-none">
                  Login
                </Link>
              </Dropdown.Item>
              <span className={styles.signUpItem}>
                New To Konio?
                <Link to="/signup">Sign Up</Link>
              </span>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </nav>
  );
}

const Divider = () => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      <span
        style={{
          fontSize: 10,
        }}
      >
        My Activity
      </span>
    </div>
  );
};

export default Header;
