import classNames from "classnames";
import React from "react";
import styles from "./Requests.module.css";

export function RequestDataFeatures({ requests, count }) {
  return (
    <div className={styles.featureContainer}>
      <div className={classNames(styles.feature, "rounded border-info")}>
        <span className="badge text-bg-info text-white float-start">All</span>
        <span className={styles.featureNumber}>{requests.length}</span>
      </div>
      <div className={classNames(styles.feature, "rounded border-success")}>
        <span className="badge text-bg-success text-white float-start">
          Approved
        </span>
        <span className={styles.featureNumber}>{count.approved}</span>
      </div>
      <div className={classNames(styles.feature, "rounded border-warning")}>
        <span className="badge text-bg-warning text-white float-start">
          Pending
        </span>
        <span className={styles.featureNumber}>{count.pending}</span>
      </div>
      <div className={classNames(styles.feature, "rounded border-danger")}>
        <span className="badge text-bg-danger text-white float-start">
          Rejected
        </span>
        <span className={styles.featureNumber}>{count.rejected}</span>
      </div>
    </div>
  );
}
