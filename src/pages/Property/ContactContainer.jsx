import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/slices/userSlice";
import { getUserData, isLoggedIn } from "../../utils/auth";
import styles from "./Property.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Offer } from "./Offer";

export function ContactContainer({ property, handleRequestClick }) {
  const dispatch = useDispatch();

  const { userRole } = getUserData();
  const { userDetails, loading } = useSelector((store) => store.user);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (property.approvalStatus === 2) {
      dispatch(getUserById(property.userId)).then((res) => {
        if (res.payload === "Request failed with status code 404") {
          setError(true);
        }
      });
    }
  }, [dispatch, property]);

  if (!isLoggedIn() || getUserData().userRole !== "Buyer") return null;

  if (property.status === "Sold" || property.status === "Rented") return null;

  return (
    <>
      <div className={styles.propertySide}>
        <div className={styles.contactContainer}>
          <h3>Contact Details of Seller</h3>
          <hr />
          {getUserData().userRole ===
          "Admin" ? null : property.approvalStatus === 2 ? (
            error ? (
              <>No Details found</>
            ) : loading ? (
              <LoadingSpinner />
            ) : (
              <div className="w-100 d-flex flex-column align-items-start">
                <span>
                  Name -&nbsp;
                  <span className="text-decoration-none">
                    {userDetails.name}
                  </span>
                </span>
                <span>
                  Contact -&nbsp;
                  <a
                    className="text-decoration-none"
                    href={`tel:${property.contactNumber}`}
                  >
                    {property.contactNumber}
                  </a>
                  {userDetails.phone ? (
                    <>
                      ,
                      <a
                        className="text-decoration-none"
                        href={`tel:${property.contactNumber}`}
                      >
                        {userDetails.phone}
                      </a>
                    </>
                  ) : null}
                </span>
                <span>
                  Email -&nbsp;
                  <a
                    className="text-decoration-none"
                    href={`mailto:${userDetails.email}`}
                  >
                    {userDetails.email}
                  </a>
                </span>
              </div>
            )
          ) : property.approvalStatus === 1 ? (
            <Button variant="info">Pending Approval</Button>
          ) : property.approvalStatus === 3 ? (
            <Button variant="danger">Rejected</Button>
          ) : userRole === "Buyer" && property.approvalStatus === 0 ? (
            <Button
              onClick={handleRequestClick}
              variant="info"
              className="text-white"
            >
              Request Approval
            </Button>
          ) : null}
        </div>
        <Offer property={property} />
      </div>
    </>
  );
}
