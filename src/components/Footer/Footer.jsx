import classNames from "classnames";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classNames("container-fluid ", styles.footer)}>
      <div
        className={classNames(
          "d-flex flex-column align-items-start gap-4 float-start m-2",
          styles.brandContainer
        )}
      >
        <img
          width={150}
          src="https://preview.colorlib.com/theme/konato/assets/img/logo/logo2_footer.png"
          alt="logo"
        />
        <span className="text-wrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
        <span className="d-flex align-items-center justify-content-start gap-4">
          <FaInstagram />
          <FaFacebook />
          <FaLinkedin />
          <FaYoutube />
        </span>
      </div>
      <div className={classNames("", styles.copyright)}>
        <span>Copyright ©2024 All rights reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
