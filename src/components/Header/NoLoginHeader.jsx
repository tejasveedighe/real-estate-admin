import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function NoLoginHeader() {
  return (
    <nav
      className={classNames(
        "d-flex align-items-center justify-content-around sticky-top",
        styles.navbar
      )}
    >
      <div className="d-flex align-items-center justify-content-start ">
        <Link to="/" className={styles.navLink}>
          <img
            src="https://preview.colorlib.com/theme/konato/assets/img/logo/logo.png"
            alt="Logo"
          />
        </Link>
      </div>
    </nav>
  );
}

export default NoLoginHeader;
