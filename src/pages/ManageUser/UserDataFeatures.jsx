import React from "react";
import classNames from "classnames";
import styles from "./ManageUser.module.css";

export function UserDataFeatures({ users, count }) {
  return (
    <div className={styles.featureContainer}>
      <div className={classNames(styles.feature, "rounded border-info")}>
        <span className="badge text-bg-info text-white float-start">All</span>
        <span className={styles.featureNumber}>{users.length - 1}</span>
      </div>
      <div className={classNames(styles.feature, "rounded border-warning")}>
        <span className="badge text-bg-warning text-white float-start">
          Buyers
        </span>
        <span className={styles.featureNumber}>{count.buyers}</span>
      </div>
      <div className={classNames(styles.feature, "rounded border-primary")}>
        <span className="badge text-bg-primary text-white float-start">
          Sellers
        </span>
        <span className={styles.featureNumber}>{count.sellers}</span>
      </div>
    </div>
  );
}
