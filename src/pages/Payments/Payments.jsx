import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayments } from "../../redux/slices/paymentSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./Payments.module.css";
import classNames from "classnames";
import { Badge } from "react-bootstrap";

function Payments() {
  const dispatch = useDispatch();
  const { loading, payments } = useSelector((store) => store.payment);

  useEffect(() => {
    dispatch(getAllPayments()).catch((err) => console.log(err.message));
  }, [dispatch]);

  return (
    <main className={classNames("text-center mt-5 container", styles.parent)}>
      <h1>All Transactions</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Price</th>
                <th>Payment Date</th>
                <th>Payment Status</th>
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment, index) => (
                <tr key={payment.paymentId}>
                  <td>{index + 1}</td>
                  <td>{payment.price}</td>
                  <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                  <td>
                    <Badge
                      bg={payment.paymentStatus === 1 ? "success" : "danger"}
                    >
                      {payment.paymentStatus === 1 ? "Complete" : "Failed"}
                    </Badge>
                  </td>
                  <td>{payment.paymentType === 0 ? "Buy" : "Rent"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

export default Payments;
