import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getDashBoardData } from "../../redux/slices/dashboardSlice";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((store) => store.dashboard);
  const getDashData = useCallback(() => {
    dispatch(getDashBoardData());
  }, [dispatch]);
  useEffect(() => {
    getDashData();
  }, []);
  return (
    <main className="text-start">
      <h1 className="mb-3 ms-3">Dashboard</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <section className={styles.featuresContainer}>
            <div className={styles.feature}>
              <div className={styles.featureHeadings}>
                <span className={styles.featureHeading}>Offers Made</span>
                <span className={styles.featureTime}>Total</span>
              </div>
              <div className={styles.featureBody}>
                <div className={styles.featureNumber}>{data.offersCount}</div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureHeadings}>
                <span className={styles.featureHeading}>Buyers Joined</span>
                <span className={styles.featureTime}>Total</span>
              </div>
              <div className={styles.featureBody}>
                <div className={styles.featureNumber}>{data.buyersCount}</div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureHeadings}>
                <span className={styles.featureHeading}>Properties Added</span>
                <span className={styles.featureTime}>Total</span>
              </div>
              <div className={styles.featureBody}>
                <div className={styles.featureNumber}>
                  {data.propertiesCount}
                </div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureHeadings}>
                <span className={styles.featureHeading}>Payments</span>
                <span className={styles.featureTime}>This Month</span>
              </div>
              <div className={styles.featureBody}>
                <div className={styles.featureNumber}>
                  {data.paymentsThisMonthCount}
                </div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureHeadings}>
                <span className={styles.featureHeading}>Sales</span>
                <span className={styles.featureTime}>All</span>
              </div>
              <div className={styles.featureBody}>
                <div className={styles.featureNumber}>
                  {data.totalPaymentsAmount}
                </div>
              </div>
            </div>
          </section>
          <section className={styles.sellers}>
            <p>
              <h5>Sellers</h5>
            </p>
            <table></table>
          </section>
        </>
      )}
    </main>
  );
}

export default AdminDashboard;
