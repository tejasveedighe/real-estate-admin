import classNames from "classnames";
import React from "react";
import styles from "./Newsletter.module.css";

export function Newsletter() {
  return (
    <section
      className={classNames(
        "d-flex align-items-center justify-content-between",
        styles.newsLetterSection
      )}
    >
      <div
        className={classNames(
          "d-flex align-items-end flex-column",
          styles.newLetterFormContainer
        )}
      >
        <div className="">
          <h1 className="text-white">Subscribe Newsletter</h1>
          <span className="text-white">
            Get started by choosing from our pre-built templates to showcase
            your properties.
          </span>

          <form className="mt-5 d-flex align-items-start flex-column gap-2">
            <input
              className={styles.newsLetterInput}
              placeholder="Enter Your Email"
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className={styles.newsLetterImage} />
    </section>
  );
}
